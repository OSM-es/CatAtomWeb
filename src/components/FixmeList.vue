<script setup>
import { useI18n } from 'vue-i18n'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'

// eslint-disable-next-line no-undef
defineProps({
  municipio: {
    type: String,
    default: '',
  },
  fixmes: {
    type: Array,
    default: () => [],
  },
  files: {
    type: Object,
    default: () => null,
  },
})
// eslint-disable-next-line no-undef
defineEmits(['change'])
const { t } = useI18n()
const job = useJobStore()
const user = useUserStore()

function getOwner(fixme) {
  const msg = fixme.locked ? 'Locked by' : 'Edited by'
  return fixme.username && t(msg) + ' ' + fixme.username
}

function uploadEnabled(fixme) {
  return user.isOwner({ osm_id: fixme.osm_id })
}

function isLocked(fixme) {
  if (
    !fixme.locked ||
    user.isOwner(job.propietario) ||
    user.isOwner({ osm_id: fixme.osm_id })
  ) {
    return ''
  }
  return 'is-disabled'
}

function onDownload(event) {
  const filename = event.target.pathname.split('/').pop()
  job.getFixme(filename)
}

function onUndo(filename) {
  job.postFixme(filename)
}

function chatColor(fixme) {
  return fixme.osm_id ? 'chat-color-' + (fixme.osm_id % 32) : ''
}
</script>
<template>
  <div class="panel-block">
    <p>
      <i18n-t keypath="reviewed_files" scope="global">
        <span>{{ job.revisar.length - job.fixmes }}</span>
        <span>{{ job.revisar.length }}</span>
      </i18n-t>
    </p>
  </div>
  <div
    v-for="(fixme, index) in fixmes"
    :key="index"
    class="panel-block is-block fixme"
    :class="chatColor(fixme)"
  >
    <nav v-if="!files.fileExists(fixme.filename)" class="level is-mobile">
      <div class="level-left has-tooltip-arrow" :data-tooltip="getOwner(fixme)">
        <a
          :href="`${job.url}/${fixme.filename}`"
          :class="isLocked(fixme)"
          download
          @click="onDownload"
        >
          <span class="icon">
            <font-awesome-icon icon="download" />
          </span>
          {{ fixme.filename }} ({{ fixme.fixmes }} fixmes)
        </a>
      </div>
      <div class="level-right">
        <div v-show="uploadEnabled(fixme)" class="field has-addons">
          <div class="control file has-name is-small">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                @change="$emit('change', $event.target.files)"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon icon="upload" />
                </span>
                <span class="file-label">
                  {{ $t('Select reviewed file') }}
                </span>
              </span>
            </label>
          </div>
          <div class="control" @click="onUndo(fixme.filename)">
            <a
              class="button is-small is-light has-tooltip-arrow"
              :data-tooltip="$t('Undo')"
            >
              <font-awesome-icon icon="undo" />
            </a>
          </div>
        </div>
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
</template>

<style lang="scss" scoped>
.fixme {
  padding: 0.25em 0.75em;
  line-height: 1.9em;
}
</style>
