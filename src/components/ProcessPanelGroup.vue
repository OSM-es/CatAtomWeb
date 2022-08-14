<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import ProcessButton from './ProcessButton'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '../stores/user'

const wikiUrl =
  'https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos#Revisi%C3%B3n_de_nombres_de_calles'
const job = useJobStore()
const user = useUserStore()
const processPanel = ref(null)

const isOwner = computed(() => {
  return job.propietario && user.isOwner(job.propietario)
})

function isActive(panel) {
  const estado = job.estado
  if (panel == 'processPanel') {
    return estado == 'AVAILABLE' || estado == 'ERROR' || estado == 'RUNNING'
  }
  if (panel == 'reviewPanel') {
    return estado == 'REVIEW'
  }
  if (panel == 'fixmePanel') {
    return estado == 'FIXME'
  }
  if (panel == 'publishPanel') {
    return estado == 'DONE'
  }
  return false
}

function zoningUrl() {
  if (job.cod_division) {
    return `results/${job.cod_municipio}/tasks/${job.cod_division}/zoning.geojson`
  } else {
    return `results/${job.cod_municipio}/zoning.geojson`
  }
}

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

function changeArgs(event) {
  job.edificios = event.target.value == '-b'
  job.direcciones = event.target.value == '-d'
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
  <vue-collapsible-panel-group class="mb-5">
    <vue-collapsible-panel
      ref="processPanel"
      data-test="processPanel"
      class="panel"
      :class="isActive('processPanel') ? 'is-info' : ''"
      :expanded="isActive('processPanel')"
    >
      <template #title>
        <p class="panel-heading">1. {{ $t('Process') }}</p>
      </template>
      <template #content>
        <div
          class="container"
          :class="
            isActive('processPanel') && job.estado != 'RUNNING'
              ? ''
              : 'is-disabled'
          "
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
    <nav v-if="isActive('reviewPanel')" class="panel is-info">
      <div class="panel-heading">
        <p>2. {{ $t('Review street names') }}</p>
      </div>
      <div class="container">
        <div class="panel-block">
          <p v-if="job.highways == 0">
            {{ $t('welldone2') }}
          </p>
          <p v-else>
            <i18n-t keypath="review_msg" scope="global">
              <a :href="wikiUrl">{{ $t('guide') }}</a>
              <font-awesome-icon icon="check" />
              <font-awesome-icon icon="times" />
            </i18n-t>
          </p>
        </div>
        <div v-if="job.highways > 0">
          <article class="message is-info">
            <div class="message-body is-radiusless">
              <i18n-t
                keypath="highways left"
                scope="global"
                :plural="job.highways"
              >
                {{ job.highways }}
              </i18n-t>
            </div>
          </article>
        </div>
        <div class="panel-block">
          <process-button
            :classes="job.highways > 0 ? 'is-warning' : 'is-success'"
            @click="processJob()"
          >
            <span>{{ $t('Reprocess') }}</span>
            <span class="icon">
              <font-awesome-icon icon="repeat" />
            </span>
          </process-button>
        </div>
      </div>
    </nav>
    <nav v-if="isActive('fixmePanel')" class="panel is-info">
      <div class="panel-heading">
        <p>2. {{ $t('Check fixmes') }}</p>
      </div>
      <div id="fixmePanel" class="container">
        <div class="panel-block">
          <p v-if="job.fixmes == 0">
            {{ $t('welldone1') }}
          </p>
          <p v-else>
            <i18n-t keypath="fixme_msg" scope="global">
              <template #download>
                <span class="icon"><font-awesome-icon icon="download" /></span>
              </template>
              <template #upload>
                <span class="icon"><font-awesome-icon icon="upload" /></span>
              </template>
              <template #link>
                <a :href="wikiUrl" target="_blank">{{ $t('guide') }}</a>
              </template>
            </i18n-t>
          </p>
        </div>
        <div v-if="job.fixmes > 0">
          <article class="message is-info">
            <div class="message-body">
              <i18n-t keypath="fixmes left" scope="global" :plural="job.fixmes">
                {{ job.fixmes }}
              </i18n-t>
            </div>
          </article>
        </div>
        <div v-else class="panel-block">
          <process-button classes="is-success" @click="job.deleteFixme">
            <span>{{ $t('Confirm') }}</span>
            <span class="icon">
              <font-awesome-icon icon="check" />
            </span>
          </process-button>
        </div>
      </div>
    </nav>
    <nav v-if="isActive('publishPanel')" class="panel is-info">
      <div class="panel-heading">
        <p>3. {{ $t('Publish') }}</p>
      </div>
      <div id="publishPanel" class="container">
        <div v-if="isOwner">
          <div v-if="job.args && !job.next_args" class="panel-block">
            <div class="select" @change="changeArgs">
              <select>
                <option :selected="job.args == '-b'" value="-b">
                  {{ $t('Buildings') }}
                </option>
                <option :selected="job.args == '-d'" value="-d">
                  {{ $t('Addresses') }}
                </option>
              </select>
            </div>
          </div>
          <div class="panel-block">
            <div class="content">
              <p>
                <i18n-t keypath="done_msg1" scope="global">
                  <a href="https://tareas.openstreetmap.es" target="_blank">
                    {{ $t('Task manager') }}
                  </a>
                  <a :href="zoningUrl()">zoning.geojson</a>
                </i18n-t>
              </p>
              <p>
                <i18n-t keypath="done_msg2" scope="global">
                  <span class="icon"><font-awesome-icon icon="copy" /></span>
                </i18n-t>
              </p>
            </div>
          </div>
          <div v-if="job.next_args" class="panel-block">
            <div class="content">
              <p>{{ $t('You can also') }}</p>
              <process-button @click="processJob()">
                {{ $t(job.nextMsg) }}
              </process-button>
            </div>
          </div>
        </div>
        <div v-else class="panel-block">
          <span>
            {{ $t('The process is locked by') }}
            <a :href="`https://www.openstreetmap.org/user/${username}`">{{
              job.propietario.username
            }}</a>
          </span>
        </div>
      </div>
    </nav>
  </vue-collapsible-panel-group>
</template>
