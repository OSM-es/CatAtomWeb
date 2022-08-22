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

function getData() {
  return props.title == 'Log' ? job.log : job.informe
}

function isActive() {
  return job.estado == 'RUNNING' ? 'is-info' : ''
}

function formatRow(row) {
  if (row == '') {
    return ' '
  }
  return row.replace(/^=+/g, '').replace(/=+$/g, '')
}

function styleRow(row) {
  let style = ''
  if (row.startsWith('=')) {
    style = 'has-text-weight-bold'
    if (!row.startsWith('==')) {
      style += ' is-underlined'
    }
  }
  return style
}
</script>

<template>
  <vue-collapsible-panel class="panel" :class="isActive()">
    <template #title>
      <p class="panel-heading">{{ $t(title) }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="table-container">
          <p
            v-for="(row, i) in getData()"
            :key="i"
            class="terminal"
            :class="styleRow(row)"
          >
            {{ formatRow(row) }}
          </p>
          <div v-if="job.estado == 'RUNNING'" class="loader"></div>
        </div>
      </div>
    </template>
  </vue-collapsible-panel>
</template>

<style lang="scss">
.terminal {
  font-family: monospace;
  margin-bottom: 0 !important;
  white-space: pre;
}
</style>
