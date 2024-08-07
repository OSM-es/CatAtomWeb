<script setup>
import { computed, ref, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useJobStore } from '@/stores/job'
import { useProvStore } from '@/stores/provincias'
import { useChatService } from '@/services/chat'
import { useUserStore } from '@/stores/user'
import { clipboardHandler } from '@/compositions/clipboard'

const { t } = useI18n()
const wikiUrl =
  'https://wiki.openstreetmap.org/wiki/ES:Tag:boundary%3Dadministrative'
const router = useRouter()
const job = useJobStore()
const chat = useChatService()
const userStore = useUserStore()
const provincias = useProvStore()
const municipios = ref([])
const divisiones = ref([])
const provincia = ref(null)
const loadingMun = ref(false)
const loadingDiv = ref(false)
let municipioPrevio = null

chat.on('updateJob', (data) => {
  if (!userStore.isOwner(data)) {
    job.updateJob(data.job)
  }
})

chat.on('createJob', (data) => {
  if (job.estado == 'REVIEW') {
    job.charla.push(t('restart_job', data))
  } else {
    job.charla.push(t('create_job', data))
  }
})

chat.on('deleteJob', (data) => {
  if (!userStore.isOwner(data)) {
    job.updateJob(data.job)
  }
  job.charla.push(t('delete_job', data))
})

chat.on('done', (data) => {
  let name = job.cod_municipio
  if (!userStore.isOwner(data)) {
    job.updateJob(data.job)
  }
  if (job.cod_division) {
    name += ' (' + job.report.split_name + ')'
  }
  job.charla.push(t('finish_job', [name]))
})

const divDisabled = computed(() => {
  if (divisiones.value.length == 0) {
    return true
  } else if (!['AVAILABLE', 'ERROR', 'DONE'].includes(job.estado)) {
    return true
  } else if (job.report.options && !job.report.options.includes('-s')) {
    return true
  }
  return false
})

async function fetchMunicipios(prov) {
  loadingMun.value = true
  loadingDiv.value = false
  const response = await api.getProv(prov)
  job.$reset()
  loadingMun.value = false
  municipios.value = response.data.municipios.map((mun) => ({
    cod_municipio: mun.cod_municipio,
    nombre: mun.nombre,
    estado: mun.estado,
    label: mun.cod_municipio + ' ' + mun.nombre,
  }))
}

function fetchDivisiones(mun) {
  getJobStatus()
  loadingDiv.value = true
  api
    .getMun(mun)
    .then((response) => {
      loadingDiv.value = false
      divisiones.value = response.data.divisiones
    })
    .catch(() => {
      loadingDiv.value = false
    })
}

function getRoom(cod_municipio = job.cod_municipio) {
  return {
    id: userStore.osmId,
    username: userStore.username,
    room: cod_municipio,
  }
}

function getJobStatus() {
  if (municipioPrevio && municipioPrevio != job.cod_municipio) {
    chat.socket.emit('leave', getRoom(municipioPrevio))
    job.cod_division = null
  }
  if (job.cod_municipio) {
    if (job.last_mun != job.cod_municipio) {
      chat.socket.emit('join', getRoom())
    }
    job.getJob(job.cod_municipio, job.cod_division).then(() => {
      if (localStorage.getItem('municipio') != job.cod_municipio) {
        localStorage.setItem('municipio', job.cod_municipio || '')
      }
      localStorage.setItem('division', '')
      router.replace({ name: 'process' })
      municipioPrevio = job.cod_municipio
    })
  }
}

function shareLink(event) {
  const link = document.location.origin + '/' + job.link
  clipboardHandler(event, link)
}

onMounted(() => {
  provincias.fetch()
  const mun = localStorage.getItem('municipio')
  const div = localStorage.getItem('division')
  if (mun) {
    provincia.value = mun.substring(0, 2)
    fetchMunicipios(provincia.value).then(() => {
      job.cod_municipio = mun
      if (div) {
        job.cod_division = div
      }
      fetchDivisiones(mun)
    })
  }
})

onBeforeUnmount(() => {
  chat.disconnect()
})
</script>

<template>
  <div class="box">
    <div class="field">
      <div class="control">
        <v-select
          v-model="provincia"
          data-test="provincia"
          :placeholder="$t('Select the province')"
          :options="provincias.data"
          :clearable="false"
          :select-on-tab="true"
          :reduce="(prov) => prov && prov.cod_provincia"
          @update:model-value="fetchMunicipios"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars  -->
          <template #no-options="{ search, searching, loading }">
            {{ $t('Sorry, no matching option') }}
          </template>
        </v-select>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <v-select
          v-model="job.cod_municipio"
          data-test="municipio"
          :reduce="(mun) => mun && mun.cod_municipio"
          :options="municipios"
          :placeholder="$t('Select the municipality')"
          :clearable="false"
          :select-on-tab="true"
          :disabled="municipios.length == 0"
          :loading="loadingMun"
          @update:model-value="fetchDivisiones"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars  -->
          <template #no-options="{ search, searching, loading }">
            {{ $t('Sorry, no matching option') }}
          </template>
          <template #option="{ cod_municipio, nombre, estado }">
            <span :class="`is-${estado}`">
              {{ cod_municipio }} {{ nombre }}
            </span>
          </template>
        </v-select>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <v-select
          v-model="job.cod_division"
          data-test="division"
          label="nombre"
          :reduce="(div) => div && div.osm_id"
          :placeholder="$t('Select the subarea')"
          :options="divisiones"
          :select-on-tab="true"
          :disabled="divDisabled"
          :loading="loadingDiv"
          @update:model-value="getJobStatus"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars  -->
          <template #no-options="{ search, searching, loading }">
            {{ $t('Sorry, no matching option') }}
          </template>
          <template #option="{ nombre, estado }">
            <span :class="`is-${estado}`">
              {{ nombre.replace('  ', '&nbsp;&nbsp;&nbsp;&nbsp;') }}
            </span>
          </template>
        </v-select>
      </div>
    </div>
    <div v-if="!job.cod_municipio" class="notification is-info is-light">
      <i18n-t keypath="select_job" scope="global">
        <a :href="wikiUrl">{{ $t('admin boundaries') }}</a>
      </i18n-t>
    </div>
    <a
      v-else
      class="has-tooltip-arrow"
      :data-tooltip="$t('Copy to clipboard')"
      @click="shareLink"
    >
      {{ $t('Share project') }}
      <span class="icon is-fake-btn">
        <font-awesome-icon icon="share" />
      </span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.vs__dropdown-menu {
  white-space: pre;
}
.is-DONE {
  color: hsl(229, 53%, 53%); //hsl(0, 0%, 48%);
}
.is-FIXME,
.is-REVIEW,
.is-RUNNING {
  font-weight: 700;
}
.is-ERROR {
  color: hsl(348, 86%, 61%);
}
</style>
