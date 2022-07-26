<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { useJobStore } from '@/stores/job'
import { useProvStore } from '@/stores/provincias'
import { useChatService } from '@/services/chat'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const wikiUrl =
  'https://wiki.openstreetmap.org/wiki/ES:Tag:boundary%3Dadministrative'
const route = useRoute()
const router = useRouter()
const job = useJobStore()
const chat = useChatService()
const userStore = useUserStore()
const provincias = useProvStore()
const municipios = ref([])
const divisiones = ref([])
const provincia = ref(null)
const municipio = ref(null)
const division = ref(null)
const loadingMun = ref(false)
const loadingDiv = ref(false)
let municipioPrevio = null

chat.on('updateJob', (data) => {
  if (!userStore.isOwner(data)) {
    job.getJob(job.cod_municipio, job.cod_division)
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
    job.getJob(job.cod_municipio, job.cod_division)
  }
  job.charla.push(t('delete_job', data))
})

chat.on('done', (data) => {
  let name = job.cod_municipio
  if (!userStore.isOwner(data)) {
    job.getJob(job.cod_municipio, job.cod_division)
  }
  if (job.cod_division) {
    name += ' (' + job.report.split_name + ')'
  }
  job.charla.push(t('finish_job', [name]))
})

async function fetchMunicipios(prov) {
  loadingMun.value = true
  loadingDiv.value = false
  const response = await api.getProv(prov)
  job.$reset()
  municipio.value = null
  division.value = null
  loadingMun.value = false
  municipios.value = response.data.municipios.map((mun) => ({
    cod_municipio: mun.cod_municipio,
    nombre: mun.nombre,
    label: mun.cod_municipio + ' ' + mun.nombre,
  }))
}

function fetchDivisiones(mun) {
  getJobStatus()
  loadingDiv.value = true
  api
    .getMun(mun)
    .then((response) => {
      division.value = null
      loadingDiv.value = false
      divisiones.value = response.data.divisiones
    })
    .catch(() => {
      loadingDiv.value = false
    })
}

function getRoom(cod_municipio = municipio.value) {
  return {
    id: userStore.osmId,
    username: userStore.username,
    room: cod_municipio,
  }
}

function getJobStatus() {
  if (municipioPrevio && municipioPrevio != municipio.value) {
    chat.socket.emit('leave', getRoom(municipioPrevio))
  }
  if (municipio.value) {
    if (municipioPrevio != municipio.value) {
      job.$reset()
      chat.socket.emit('join', getRoom())
    }
    job.getJob(municipio.value, division.value || '').then(() => {
      division.value = job.cod_division
      console.info(route)
      if (localStorage.getItem('municipio') != municipio.value) {
        localStorage.setItem('municipio', municipio.value)
        router.replace({ name: 'process' })
      }
      municipioPrevio = municipio.value
    })
  }
}

onMounted(() => {
  provincias.fetch()
  const mun = localStorage.getItem('municipio')
  if (mun) {
    provincia.value = mun.substring(0, 2)
    fetchMunicipios(provincia.value).then(() => {
      municipio.value = mun
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
          v-model="municipio"
          data-test="municipio"
          :reduce="(mun) => mun && mun.cod_municipio"
          :placeholder="$t('Select the municipality')"
          :options="municipios"
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
        </v-select>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <v-select
          v-if="
            !job.estado ||
            job.estado == 'AVAILABLE' ||
            job.estado == 'ERROR' ||
            (job.estado == 'DONE' && job.report.split_name)
          "
          v-model="division"
          data-test="division"
          label="nombre"
          :reduce="(div) => div && div.osm_id"
          :placeholder="$t('Select the subarea')"
          :options="divisiones"
          :select-on-tab="true"
          :disabled="divisiones.length == 0"
          :loading="loadingDiv"
          @update:model-value="getJobStatus"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars  -->
          <template #no-options="{ search, searching, loading }">
            {{ $t('Sorry, no matching option') }}
          </template>
        </v-select>
        <div v-else class="control is-disabled">
          <input class="input" :value="job.report.split_name" />
        </div>
      </div>
    </div>
    <div v-if="municipio === null" class="notification is-info is-light">
      <i18n-t keypath="select_job" scope="global">
        <a :href="wikiUrl">{{ $t('admin boundaries') }}</a>
      </i18n-t>
    </div>
  </div>
</template>
