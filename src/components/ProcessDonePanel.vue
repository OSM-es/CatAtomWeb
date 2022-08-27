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
  job.getJob(job.cod_municipio, job.cod_division, true)
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
          <div v-if="job.type.length == 'bd'" class="panel-block">
            <div class="select" @change="changeArgs">
              <select :value="job.current_args">
                <option value="-b">{{ $t('Buildings') }}</option>
                <option value="-d">{{ $t('Addresses') }}</option>
              </select>
            </div>
          </div>
          <div class="panel-block">
            <div class="content">
              <p>
                <i18n-t keypath="done_msg1" scope="global">
                  <a href="https://tareas.openstreetmap.es" target="_blank">
                    {{ $t('Task manager') }}
                    <font-awesome-icon icon="external-link" />
                  </a>
                  <a :href="job.url + '/zoning.zip'">
                    zoning.zip
                    <font-awesome-icon icon="download" />
                  </a>
                </i18n-t>
              </p>
              <p>Número de tareas: {{ job.report.tasks }}</p>
              <p>
                <i18n-t keypath="done_msg2" scope="global">
                  <span class="icon"><font-awesome-icon icon="copy" /></span>
                </i18n-t>
              </p>
              <a
                class="button is-success is-fullwidth"
                href="https://tareas.openstreetmap.es/manage/projects/new/"
                target="_blank"
              >
                <span>{{ $t('add_project') }}</span>
                <span class="icon">
                  <font-awesome-icon icon="plus" />
                </span>
              </a>
            </div>
          </div>
          <div
            v-if="job.type.length == 'b' || job.type == 'd'"
            class="panel-block"
          >
            <div class="content">
              <p>{{ $t('You can also') }}</p>
              <process-button
                classes="is-outlined is-primary"
                @click="emit('process-job')"
              >
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
