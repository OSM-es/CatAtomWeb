<template>
  <div
    v-for="(fixme, index) in fixmes"
    :key="index"
    class="panel-block is-block"
    :class="chatColor(fixme)"
  >
    <nav v-if="!files.fileExists(fixme.filename)" class="level is-mobile">
      <div class="level-left has-tooltip-arrow" :data-tooltip="getOwner(fixme)">
        <a
          :href="getUrl(fixme.filename)"
          :class="isLocked(fixme)"
          target="_blank"
          @click="onDownload"
        >
          <span class="icon">
            <font-awesome-icon icon="download" />
          </span>
          {{ fixme.filename }} ({{ fixme.fixmes }} fixmes)
        </a>
      </div>
      <div class="level-right file is-small">
        <label v-show="uploadEnabled(fixme)" class="file-label">
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
              {{ $t('Select reviewed file') }}
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
</template>
