<script setup>
import { ref } from 'vue'

const data = ref(null)

function copyToClipboard() {
  navigator.clipboard.writeText(data.value.outerText || data.value.innerHTML)
}
</script>

<template>
  <button
    class="button is-small is-pulled-right has-tooltip-arrow"
    :data-tooltip="$t('Copy to clipboard')"
    @click="copyToClipboard"
  >
    <span class="icon">
      <font-awesome-icon icon="copy" />
    </span>
  </button>
  <div ref="data" data-test="data">
    <slot></slot>
  </div>
</template>
