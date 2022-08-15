<script setup>
import { useJobStore } from '@/stores/job'
import ProcessButton from './ProcessButton'

const wikiUrl =
  'https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos#Revisi%C3%B3n_de_nombres_de_calles'
const job = useJobStore()
</script>

<template>
  <vue-collapsible-panel v-if="job.estado == 'DONE'" :expanded="false">
    <template #title>
      <p class="panel-heading">2. {{ $t('Review') }}</p>
    </template>
    <template #content>
      <div class="panel-block">{{ $t('Review done') }}.</div>
    </template>
  </vue-collapsible-panel>
  <vue-collapsible-panel v-if="job.estado == 'REVIEW'" class="panel is-info">
    <template #title>
      <p class="panel-heading">2. {{ $t('Review street names') }}</p>
    </template>
    <template #content>
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
        <div class="panel-block">
          <process-button
            :classes="job.highways > 0 ? 'is-warning' : 'is-success'"
            @click="emit('process-job')"
          >
            <span>{{ $t('Reprocess') }}</span>
            <span class="icon">
              <font-awesome-icon icon="repeat" />
            </span>
          </process-button>
        </div>
      </div>
    </template>
  </vue-collapsible-panel>
  <vue-collapsible-panel v-if="job.estado == 'FIXME'" class="panel is-info">
    <template #title>
      <p class="panel-heading">2. {{ $t('Check fixmes') }}</p>
    </template>
    <template #content>
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
        <div v-if="job.fixmes == 0" class="panel-block">
          <process-button classes="is-success" @click="job.deleteFixme">
            <span>{{ $t('Confirm') }}</span>
            <span class="icon">
              <font-awesome-icon icon="check" />
            </span>
          </process-button>
        </div>
      </div>
    </template>
  </vue-collapsible-panel>
</template>
