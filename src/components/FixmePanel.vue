<script setup>
import { defineProps, ref } from "vue";
import { api } from "@/api";
import { useJobStore } from "@/stores/job";
import DropZone from "./DropZone.vue";
import UploadableFileList from "../compositions/UploadableFileList";
import { useErrorStore } from "@/stores/error";

const props = defineProps(["municipio", "fixmes"]);
const errorStore = useErrorStore();
const job = useJobStore();
const files = new UploadableFileList();
const uploadEnabled = ref(true);

function getUrl(filename) {
  return `results/${props.municipio}/tasks/${filename}`;
}

function onNewFiles(newFiles) {
  const matchFiles = UploadableFileList.filterByNames(
    [...newFiles],
    props.fixmes
  );
  files.addFiles(matchFiles);
  files.getFiles().forEach((file) => {
    const config = {
      onUploadProgress: file.onUploadProgress(),
    };
    let formData = new FormData();
    formData.append("file", file.file);
    api
      .put("job/" + job.data.cod_municipio, formData, config)
      .then(() => {
        job.getJob(job.data.cod_municipio, job.data.cod_division);
      })
      .catch((err) => errorStore.set(err));
  });
}

function onDownload() {
  uploadEnabled.value = true;
}

function openJosm(filename) {
  const url = new URL(getUrl(filename), window.location.href).href;
  const josmUrl = `http://localhost:8111/import?new_layer=true&url=${url}`;
  fetch(josmUrl).catch(function () {
    alert(
      "Debe abrir la aplicación JOSM con el complemento Control Remoto activo"
    );
  });
  onDownload();
}
</script>

<template>
  <vue-collapsible-panel class="panel is-info">
    <template #title>
      <p class="panel-heading">Corregir errores</p>
    </template>
    <template #content>
      <div class="container">
        <drop-zone
          class="drop-area"
          @files-dropped="onNewFiles"
          #default="{ dropZoneActive }"
          :disabled="!uploadEnabled"
        >
          <div
            v-if="dropZoneActive"
            class="panel-block is-block has-text-centered"
          >
            <div class="is-size-5">Suéltalos</div>
          </div>
          <div
            v-else
            class="panel-block is-block"
            :class="uploadEnabled ? '' : 'is-disabled'"
          >
            <div class="file is-small is-justify-content-center">
              <label class="file-label">
                <div class="is-size-5">
                  Arrastra los archivos corregidos aquí o &nbsp;
                </div>
                <input
                  class="file-input"
                  type="file"
                  multiple
                  @change="onNewFiles($event.target.files)"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <font-awesome-icon icon="upload" />
                  </span>
                  <span class="file-label">selecciónalos</span>
                </span>
              </label>
            </div>
          </div>
          <div
            class="panel-block is-block"
            v-for="(filename, index) in fixmes"
            :key="index"
          >
            <nav class="level is-mobile" v-if="!files.fileExists(filename)">
              <div class="level-left">
                <a
                  :href="getUrl(filename)"
                  class="has-text-dark"
                  @click="onDownload"
                >
                  {{ filename }}
                </a>
                &nbsp;<button
                  class="button is-small"
                  @click="openJosm(filename)"
                >
                  <span class="file-icon">
                    <font-awesome-icon icon="download" />
                  </span>
                  abrir en JOSM
                </button>
              </div>
              <div class="level-right file is-small">
                <label class="file-label" v-if="uploadEnabled">
                  <input
                    class="file-input"
                    type="file"
                    @change="onNewFiles($event.target.files)"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <font-awesome-icon icon="upload" />
                    </span>
                    <span class="file-label">
                      Seleccionar archivo corregido
                    </span>
                  </span>
                </label>
              </div>
            </nav>
            <nav v-else class="level is-mobile">
              {{ filename }}&nbsp;
              <progress
                class="progress is-primary"
                :value="files.getFile(filename).percentCompleted"
                max="100"
              >
                {{ files.getFile(filename).percentCompleted }}%
              </progress>
            </nav>
          </div>
        </drop-zone>
      </div>
    </template>
  </vue-collapsible-panel>
</template>

<style lang="scss">
.progress-container:before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  line-height: 1em;
}

.progress-container {
  text-align: center;
  position: relative;
}
</style>
