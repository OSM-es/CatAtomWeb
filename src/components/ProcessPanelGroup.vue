<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import ProcessButton from './ProcessButton'
import ProcessDonePanel from './ProcessDonePanel'
import ProcessReviewPanel from './ProcessReviewPanel'
import { useJobStore } from '@/stores/job'

const job = useJobStore()
const processPanel = ref(null)

const isActive = computed(() => {
  return ['AVAILABLE', 'ERROR', 'RUNNING'].includes(job.estado)
})

function updateLog() {
  job.getJob(job.cod_municipio, job.cod_division).then(() => {
    if (job.estado == 'RUNNING') {
      setTimeout(() => {
        updateLog()
      }, 500)
    }
  })
}

function processJob() {
  if (job.next_args) {
    job.edificios = job.next_args == '-b'
    job.direcciones = job.next_args == '-d'
  }
  job.createJob().then(updateLog)
}

watch(
  () => job.estado,
  async (estado) => {
    await nextTick()
    if (processPanel.value) {
      const expanded =
        estado == 'AVAILABLE' || estado == 'ERROR' || estado == 'RUNNING'
      if (processPanel.value.isExpanded != expanded) {
        processPanel.value.toggle()
      }
    }
  }
)
</script>

<template>
  <vue-collapsible-panel-group class="mb-5" :accordion="true">
    <vue-collapsible-panel
      ref="processPanel"
      data-test="processPanel"
      class="panel"
      :class="isActive ? 'is-info' : ''"
      :expanded="isActive"
    >
      <template #title>
        <p class="panel-heading">1. {{ $t('Process') }}</p>
      </template>
      <template #content>
        <div
          class="container"
          :class="isActive && job.estado != 'RUNNING' ? '' : 'is-disabled'"
        >
          <div class="panel-block">
            <div class="container">
              <label class="label">{{ $t('Options') }}</label>
              <div class="checkbox">
                <label class="checkbox">
                  <input
                    v-model="job.edificios"
                    data-test="edificios"
                    type="checkbox"
                  />
                  {{ $t('Process buildings') }}
                </label>
                <br />
                <label class="checkbox">
                  <input v-model="job.direcciones" type="checkbox" />
                  {{ $t('Process addresses') }}
                </label>
              </div>
              <div class="field">
                <label class="label">{{ $t('Language') }}</label>
                <div class="control">
                  <div class="select">
                    <select
                      v-model="job.idioma"
                      data-test="idioma"
                      :disabled="!job.direcciones"
                    >
                      <option value="es_ES">Español</option>
                      <option value="ca_ES">Catalá</option>
                      <option value="gl_ES">Galego</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field">
              <label class="label">{{ $t('Status') }}</label>
              <div data-test="estado" class="control">{{ job.mensaje }}</div>
            </div>
          </div>
          <div class="panel-block">
            <process-button @click="processJob()">
              <span>
                {{ $t('Process') }}
              </span>
              <span class="icon">
                <font-awesome-icon icon="running" />
              </span>
            </process-button>
          </div>
        </div>
      </template>
    </vue-collapsible-panel>
    <process-review-panel @process-job="processJob"></process-review-panel>
    <process-done-panel @process-job="processJob"></process-done-panel>
  </vue-collapsible-panel-group>
</template>

<style lang="scss" scoped>
.panel {
  margin-bottom: 0em !important;
}
</style>
