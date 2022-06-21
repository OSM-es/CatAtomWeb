<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps(["disabled"]);
let active = ref(false);
let inActiveTimeout = null;

// eslint-disable-next-line no-undef
const emit = defineEmits(["files-dropped"]);

function onDrop(e) {
  if (!props.disabled) {
    setInactive();
    emit("files-dropped", [...e.dataTransfer.files]);
  }
}

function preventDefaults(e) {
  e.preventDefault();
}

function setActive() {
  if (!props.disabled) {
    active.value = true;
    clearTimeout(inActiveTimeout);
  }
}
function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<template>
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active"></slot>
  </div>
</template>
