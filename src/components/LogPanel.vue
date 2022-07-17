<script setup>
import { useJobStore } from '@/stores/job'

const job = useJobStore()

// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    default: 'Log',
  },
})

const data = props.title == 'Log' ? job.log : job.informe

function isActive() {
  return job.estado == 'RUNNING' ? 'is-info' : ''
}
</script>

<template>
  <vue-collapsible-panel class="panel" :class="isActive()">
    <template #title>
      <p class="panel-heading">{{ $t(title) }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="container">
          <p v-for="(row, i) in data" :key="i" class="terminal">
            {{ row }}
          </p>
          <div v-if="job.estado == 'RUNNING'" class="loader"></div>
        </div>
      </div>
    </template>
  </vue-collapsible-panel>
</template>
