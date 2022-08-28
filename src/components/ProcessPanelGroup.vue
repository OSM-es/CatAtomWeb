<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { between } from '@vuelidate/validators'
import ProcessButton from './ProcessButton'
import ProcessDonePanel from './ProcessDonePanel'
import ProcessReviewPanel from './ProcessReviewPanel'
import { useJobStore } from '@/stores/job'

const job = useJobStore()
const processPanel = ref(null)
const advancedOptions = ref(false)

const state = reactive({
  parcel_parts: job.parcel_parts,
  parcel_dist: job.parcel_dist,
})

const rules = {
  parcel_parts: { between: between(1, 100) },
  parcel_dist: { between: between(10, 5000) },
}

const v$ = useVuelidate(rules, state)
v$.value.$validate()

const isActive = computed(() => {
  return ['AVAILABLE', 'ERROR', 'RUNNING'].includes(job.estado)
})

const isDisabled = computed(() => {
  return !['AVAILABLE', 'ERROR'].includes(job.estado)
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
  job.parcel_dist = state.parcel_dist
  job.parcel_parts = state.parcel_parts
  if (job.type == 'b') {
    job.edificios = false
    job.direcciones = true
  }
  if (job.type == 'd') {
    job.edificios = true
    job.direcciones = false
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
      :class="{ 'is-info': isActive }"
      :expanded="isActive"
    >
      <template #title>
        <p class="panel-heading">1. {{ $t('Process') }}</p>
      </template>
      <template #content>
        <div class="container" :class="{ 'is-disabled': isDisabled }">
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
            <div class="container">
              <a
                class="has-text-weight-bold"
                @click="advancedOptions = !advancedOptions"
              >
                {{ $t('Advanced options') }}
                <font-awesome-icon
                  :icon="'angle-' + (advancedOptions ? 'up' : 'down')"
                />
              </a>
              <div v-show="advancedOptions" class="container">
                <div class="field">
                  <label class="label">
                    parcel_parts
                    <a href="/doc/process#options" target="_blank">
                      <font-awesome-icon icon="question-circle" />
                    </a>
                  </label>
                  <p class="help">{{ $t('parcel_parts_help') }}</p>
                  <div class="control">
                    <input
                      v-model="state.parcel_parts"
                      class="input"
                      :class="{ 'is-danger': v$.parcel_parts.$errors.length }"
                    />
                  </div>
                  <p
                    v-for="error of v$.parcel_parts.$errors"
                    :key="error.$uid"
                    class="help is-danger"
                  >
                    <i18n-t
                      v-if="error.$validator == 'between'"
                      keypath="between_val"
                      scope="global"
                    >
                      <span>{{ error.$params.min }}</span>
                      <span>{{ error.$params.max }}</span>
                    </i18n-t>
                    <span v-else>{{ $t(error.$message) }}</span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">
                    parcel_dist
                    <a href="/doc/process#options" target="_blank">
                      <font-awesome-icon icon="question-circle" />
                    </a>
                  </label>
                  <p class="help">{{ $t('parcel_dist_help') }}</p>
                  <div class="control">
                    <input
                      v-model="state.parcel_dist"
                      class="input"
                      :class="{ 'is-danger': v$.parcel_dist.$errors.length }"
                    />
                  </div>
                  <p
                    v-for="error of v$.parcel_dist.$errors"
                    :key="error.$uid"
                    class="help is-danger"
                  >
                    {{ error.$message }}
                  </p>
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
          <div class="panel-block" :class="{ 'is-disabled': v$.$error }">
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
