<script setup>
import { computed } from 'vue'
import ProcessButton from './ProcessButton'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'

// eslint-disable-next-line no-undef
const emit = defineEmits(['process-job'])
const job = useJobStore()
const user = useUserStore()

const isOwner = computed(() => {
  return job.propietario && user.isOwner(job.propietario)
})

const isActive = computed(() => job.estado == 'DONE')

function changeArgs(event) {
  job.edificios = event.target.value == '-b'
  job.direcciones = event.target.value == '-d'
}

function zoningUrl() {
  if (job.cod_division) {
    return `results/${job.cod_municipio}/tasks/${job.cod_division}/zoning.geojson`
  } else {
    return `results/${job.cod_municipio}/zoning.geojson`
  }
}
</script>

<template>
  <vue-collapsible-panel v-if="isActive" class="panel is-info" :expanded="true">
    <template #title>
      <p class="panel-heading">3. {{ $t('Publish') }}</p>
    </template>
    <template #content>
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
              <process-button @click="emit('process-job')">
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
    </template>
  </vue-collapsible-panel>
</template>
