<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  classes: { type: String, default: '' },
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

function hide() {
  emit('update:modelValue', false)
}

function getClass() {
  const active = props.modelValue ? 'is-active' : ''
  return `quickview ${props.classes} ${active}`
}
</script>

<template>
  <div id="quickviewDefault" :class="getClass()">
    <header class="quickview-header">
      <slot name="header"></slot>
      <span class="delete" @click="hide"></span>
    </header>
    <div class="quickview-body">
      <div class="quickview-block">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.terminal {
  font-family: monospace;
  margin-bottom: 0 !important;
}

.reviewmap.is-active {
  right: 0 !important;
}

.reviewmap.is-active.is-left {
  left: 0 !important;
}

@media screen and (max-width: 768px) {
  .reviewmap {
    width: 100% !important;
    right: -100% !important;
  }
  .reviewmap.is-left {
    left: -100% !important;
  }
}
@media screen and (min-width: 769px), print {
  .reviewmap {
    width: 40% !important;
    right: -40% !important;
  }
  .reviewmap.is-left {
    left: -40% !important;
  }
}

.reviewmap .quickview-header .title {
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 0em;
  margin-bottom: 0em;
}
</style>
