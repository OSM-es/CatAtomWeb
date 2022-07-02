<script setup>
import { useI18n } from "vue-i18n";
import { useJobStore } from "@/stores/job";
import DropZone from "./DropZone.vue";
import UploadableFileList from "@/compositions/UploadableFileList";
import { useErrorStore } from "@/stores/error";
import { useChatService } from "@/services/chat";
import { useUserStore } from "@/stores/user";

// eslint-disable-next-line no-undef
const props = defineProps(["municipio", "fixmes"]);
const { t } = useI18n();
const errorStore = useErrorStore();
const job = useJobStore();
const user = useUserStore();
const chat = useChatService();
const files = new UploadableFileList();

chat.on("fixme", (data) => {
  job.updateFixme(data);
});

function getUrl(filename) {
  return `results/${props.municipio}/tasks/${filename}`;
}

function getOwner(fixme) {
  const msg = fixme.locked ? "Locked by" : "Edited by";
  return fixme.username && t(msg) + " " + fixme.username;
}

function isLocked(fixme) {
  if (fixme.locked && !user.isOwner({ osm_id: fixme.owner })) {
    return "is-disabled";
  }
  return "";
}

function uploadEnabled(fixme) {
  return user.isOwner({ osm_id: fixme.owner });
}

function dropEnabled() {
  for (let i = 0; i < props.fixmes.length; i++) {
    if (uploadEnabled(props.fixmes[i])) {
      return true;
    }
  }
  return false;
}

function onNewFiles(newFiles) {
  const matchFiles = UploadableFileList.filterByNames(
    [...newFiles],
    props.fixmes.map((fixme) => fixme.filename)
  );
  if (newFiles.length != matchFiles.length) {
    errorStore.set(t("Select only listed files"));
  }
  files.addFiles(matchFiles);
  files.getFiles().forEach((file) => {
    const config = {
      onUploadProgress: file.onUploadProgress(),
    };
    const formData = new FormData();
    formData.append("file", file.file);
    job
      .putFixme(formData, config)
      .then((data) => {
        files.removeFile(data.filename);
      })
      .catch((err) => {
        errorStore.set(err);
      });
  });
}

function onDownload(event) {
  const filename = event.target.pathname.split("/").pop();
  job.postFixme({ filename }).catch((err) => {
    errorStore.set(err);
  });
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
        >
          <div
            v-if="dropZoneActive && dropEnabled()"
            class="panel-block is-block has-text-centered"
          >
            <div class="is-size-5">{{ $t("Drop them") }}</div>
          </div>
          <div v-else class="panel-block is-block">
            <div
              class="file is-justify-content-center is-small"
              :class="dropEnabled() ? '' : 'is-disabled'"
            >
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
              <div
                class="level-left has-tooltip-arrow"
                :data-tooltip="getOwner(fixme)"
              >
                <a
                  :href="getUrl(fixme.filename)"
                  @click.prevent="onDownload"
                  :class="isLocked(fixme)"
                >
                  <span class="icon">
                    <font-awesome-icon icon="download" />
                  </span>
                  {{ fixme.filename }} ({{ fixme.fixmes }} fixmes)
                </a>
              </div>
              <div class="level-right file is-small">
                <label class="file-label" v-show="uploadEnabled(fixme)">
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

<style lang="scss" scoped>
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

.drop-area .panel-block {
  height: 3em;
}
</style>
