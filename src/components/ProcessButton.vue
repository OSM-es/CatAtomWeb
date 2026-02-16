<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  classes: { type: String, default: 'is-primary' },
})
</script>

<template>
  <div class="container">
    <div class="has-tooltip-arrow">
      <button
        class="button is-fullwidth"
        :class="props.classes"
      >
        <slot></slot>
      </button>
    </div>
  </div>
</template>
