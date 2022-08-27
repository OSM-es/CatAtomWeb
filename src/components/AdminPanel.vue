<script setup>
import { computed } from 'vue'
import ProcessButton from './ProcessButton'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'

const job = useJobStore()
const user = useUserStore()
const titles = { b: 'Buildings', d: 'Addresses' }

const username = computed(() => {
  return job.propietario ? job.propietario.username : ''
})

const isOwner = computed(() => {
  return job.propietario && user.isOwner(job.propietario)
})

const isVisible = computed(() => {
  if (['REVIEW', 'FIXME', 'DONE', 'ERROR'].includes(job.estado)) {
    return true
  }
  return false
})

function tasksUrl() {
  return job.url
}

function exportJobUrl() {
  return process.env.VUE_APP_ROOT_API + '/export/' + job.cod_municipio
}
</script>

<template>
  <vue-collapsible-panel-group>
    <vue-collapsible-panel v-if="isVisible" class="panel" :expanded="false">
      <template #title>
        <p class="panel-heading">{{ $t('Management') }}</p>
      </template>
      <template #content>
        <div class="container">
          <div v-if="isOwner">
            <div v-if="job.estado == 'DONE'" class="panel-block">
              <i18n-t keypath="done_msg3" scope="global">
                <a :href="tasksUrl()"
                  >&nbsp;
                  {{ $t('process result') }}
                  <font-awesome-icon icon="external-link" />
                </a>
              </i18n-t>
            </div>
            <div v-if="job.estado == 'DONE'" class="panel-block">
              <div class="content">
                <p>{{ $t('export_msg') }}</p>
                <a
                  class="button is-link is-outlined is-fullwidth"
                  :href="exportJobUrl()"
                >
                  <span>{{ $t('Export') }}</span>
                  <span class="icon">
                    <font-awesome-icon icon="download" />
                  </span>
                </a>
              </div>
            </div>
            <div class="panel-block">
              <div class="content">
                <p>{{ $t('delete_msg') }}</p>
                <process-button
                  classes="is-danger is-outlined"
                  @click="job.deleteJob"
                >
                  <span>̣{{ $t('Delete') }}</span>
                  <span v-if="job.type == 'bd'">
                    &nbsp;{{ $t(titles[job.options]).toLowerCase() }}
                  </span>
                  <span class="icon">
                    <font-awesome-icon icon="trash" />
                  </span>
                </process-button>
              </div>
            </div>
          </div>
          <div v-else class="panel-block">
            {{ $t('Owner') }}:&nbsp;
            <a :href="`https://www.openstreetmap.org/user/${username}`">
              {{ username }}
            </a>
          </div>
        </div>
      </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
</template>
