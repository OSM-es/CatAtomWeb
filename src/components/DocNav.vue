<script setup>
// eslint-disable-next-line no-undef
defineProps({
  prevUrl: { type: String, default: '' },
  nextUrl: { type: String, default: '' },
})
</script>

<template>
  <nav class="buttons doc-nav">
    <a class="button is-primary is-light" :href="prevUrl">
      <span class="icon"><i>←</i></span>
      <span>
        <slot name="previous"></slot>
      </span>
    </a>
    <a class="button is-primary is-light ml-auto" :href="nextUrl">
      <span>
        <slot name="next"></slot>
      </span>
      <span class="icon"><i>→</i></span>
    </a>
  </nav>
</template>

<style lang="scss">
.doc-nav a {
  padding: 2em;
  border-radius: 0.5em;
}
.doc-nav a span:not(:last-child) {
  margin-right: 1em !important;
}
.doc-nav a span {
  text-align: left;
  font-size: 1.25em;
}
.doc-nav a span em {
  display: block;
  font-size: 0.75em;
  font-style: normal;
  opacity: 0.5;
}
</style>
