<script setup>
import { useI18n } from 'vue-i18n'
import DropZone from './DropZone.vue'
import FixmeList from './FixmeList.vue'
import UploadableFileList from '@/compositions/UploadableFileList'
import { useChatService } from '@/services/chat'
import { useErrorStore } from '@/stores/error'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'

// eslint-disable-next-line no-undef
const props = defineProps({
  municipio: {
    type: String,
    default: '',
  },
  fixmes: {
    type: Array,
    default: () => [],
  },
})
const { t } = useI18n()
const errorStore = useErrorStore()
const job = useJobStore()
const user = useUserStore()
const chat = useChatService()
const files = new UploadableFileList()

chat.on('fixme', (data) => {
  if (!user.isOwner(data)) {
    job.updateFixme(data)
  }
})

function uploadEnabled(fixme) {
  return user.isOwner({ osm_id: fixme.osm_id })
}

function dropEnabled() {
  for (let i = 0; i < props.fixmes.length; i++) {
    if (uploadEnabled(props.fixmes[i])) {
      return true
    }
  }
  return false
}

function uploadableFiles() {
  return props.fixmes
    .filter((fixme) => uploadEnabled(fixme))
    .map((fixme) => fixme.filename)
}

function onNewFiles(newFiles) {
  const matchFiles = UploadableFileList.filterByNames(
    [...newFiles],
    uploadableFiles()
  )
  if (newFiles.length != matchFiles.length) {
    errorStore.set(t('Select only downloaded files'))
  }
  files.addFiles(matchFiles)
  files.getFiles().forEach((file) => {
    const config = {
      onUploadProgress: file.onUploadProgress(),
    }
    const formData = new FormData()
    formData.append('file', file.file)
    job.putFixme(formData, config).then((data) => {
      files.removeFile(data.filename)
    })
  })
}
</script>

<template>
  <vue-collapsible-panel
    class="panel"
    :class="{ 'is-info': job.estado == 'FIXME' }"
    :expanded="job.estado == 'FIXME'"
  >
    <template #title>
      <p class="panel-heading">{{ $t('Check fixmes') }}</p>
    </template>
    <template #content>
      <div class="container" :class="{ 'is-disabled': job.estado != 'FIXME' }">
        <drop-zone
          v-slot="{ dropZoneActive }"
          class="drop-area"
          @files-dropped="onNewFiles"
        >
          <div
            v-if="dropZoneActive && dropEnabled()"
            class="panel-block is-block has-text-centered"
          >
            <div class="is-size-5">{{ $t('Drop them') }}</div>
          </div>
          <div v-else class="panel-block is-block">
            <div
              class="file is-justify-content-center is-small"
              :class="{ 'is-disabled': !dropEnabled() }"
            >
              <label class="file-label">
                <div class="is-size-5">{{ $t('Drop here or') }}&nbsp;</div>
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
                  <span class="file-label">{{ $t('select') }}</span>
                </span>
              </label>
            </div>
          </div>
          <fixme-list
            :municipio="municipio"
            :fixmes="fixmes"
            :files="files"
            @change="onNewFiles($event)"
          ></fixme-list>
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
