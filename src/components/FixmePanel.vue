<script setup>
import { ref } from "vue";
import debounce from "lodash.debounce";
import { api } from "@/services/api";
import { useJobStore } from "@/stores/job";
import DropZone from "./DropZone.vue";
import UploadableFileList from "@/compositions/UploadableFileList";
import { useErrorStore } from "@/stores/error";
import { useChatService } from "@/services/chat";
import { useI18n } from "vue-i18n";

// eslint-disable-next-line no-undef
const props = defineProps(["municipio", "fixmes"]);
const i18n = useI18n();
const errorStore = useErrorStore();
const job = useJobStore();
const chat = useChatService();
const files = new UploadableFileList();
const uploadEnabled = ref(true);

function getUrl(filename) {
  return `results/${props.municipio}/tasks/${filename}`;
}

const updateJob = debounce(() => {
  job.getJob(job.cod_municipio, job.cod_division);
  chat.socket.emit("updateJob", "newfiles", job.cod_municipio);
}, 500);

function onNewFiles(newFiles) {
  const matchFiles = UploadableFileList.filterByNames(
    [...newFiles],
    props.fixmes.map((fixme) => fixme.filename)
  );
  if (newFiles.length != matchFiles.length) {
    errorStore.set(i18n.t("Select only listed files"));
  }
  files.addFiles(matchFiles);
  files.getFiles().forEach((file) => {
    const config = {
      onUploadProgress: file.onUploadProgress(),
    };
    let formData = new FormData();
    formData.append("file", file.file);
    api
      .put("job/" + job.cod_municipio, formData, config)
      .then(updateJob)
      .catch((err) => {
        errorStore.set(err);
      });
  });
}

function onDownload() {
  uploadEnabled.value = true;
}

function chatColor(fixme) {
  return fixme.owner ? "chat-color-" + (fixme.owner % 32) : "";
}
</script>

<template>
  <vue-collapsible-panel class="panel is-info">
    <template #title>
      <p class="panel-heading">{{ $t("Check fixmes") }}</p>
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
            <div class="is-size-5">i18n.t("Drop them")</div>
          </div>
          <div
            v-else
            class="panel-block is-block"
            :class="uploadEnabled ? '' : 'is-disabled'"
          >
            <div class="file is-justify-content-center">
              <label class="file-label">
                <div class="is-size-5">{{ $t("Drop here or") }}&nbsp;</div>
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
                  <span class="file-label">{{ $t("select") }}</span>
                </span>
              </label>
            </div>
          </div>
          <div
            v-for="(fixme, index) in fixmes"
            class="panel-block is-block"
            :class="chatColor(fixme)"
            :key="index"
          >
            <nav
              class="level is-mobile"
              v-if="!files.fileExists(fixme.filename)"
            >
              <div class="level-left">
                <a :href="getUrl(fixme.filename)" @click="onDownload">
                  <span class="icon">
                    <font-awesome-icon icon="download" />
                  </span>
                  {{ fixme.filename }} ({{ fixme.fixmes }} fixmes)
                </a>
              </div>
              <div class="level-right file">
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
                      {{ $t("Select reviewed file") }}
                    </span>
                  </span>
                </label>
              </div>
            </nav>
            <nav v-else class="level is-mobile">
              {{ fixme.filename }}&nbsp;
              <progress
                class="progress"
                :value="files.getFile(fixme.filename).percentCompleted"
                max="100"
              >
                {{ files.getFile(fixme.filename).percentCompleted }}%
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
