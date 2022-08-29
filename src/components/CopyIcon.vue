<script setup>
import { ref } from 'vue'
import { clipboardHandler } from '@/compositions/clipboard'

const data = ref(null)

function copyToClipboard(event) {
  console.info(event.target.attributes, data.value.outerText)
  clipboardHandler(event, data.value.outerText || data.value.innerHTML)
}
</script>

<template>
  <button
    class="button is-small is-pulled-right has-tooltip-arrow"
    :data-tooltip="$t('Copy to clipboard')"
    @click="copyToClipboard"
  >
    <span class="icon is-fake-btn">
      <font-awesome-icon icon="copy" />
    </span>
  </button>
  <div
    ref="data"
    data-test="data"
    class="is-clicklable has-tooltip-arrow"
    :data-tooltip="$t('Copy to clipboard')"
    @click="copyToClipboard"
  >
    <slot></slot>
  </div>
</template>
