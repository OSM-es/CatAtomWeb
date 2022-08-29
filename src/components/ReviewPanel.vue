<script setup>
import { computed, ref } from 'vue'
import QuickView from '@/components/QuickView.vue'
import StreetMap from '@/components/StreetMap.vue'
import ReviewInput from './ReviewInput.vue'
import { useJobStore } from '@/stores/job'
import { useI18n } from 'vue-i18n'
import { useChatService } from '@/services/chat'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const chat = useChatService()
const job = useJobStore()
const user = useUserStore()
const filters = ref({ name: { value: '', keys: ['cat', 'conv'] } })
const totalPages = ref(1)
const currentPage = ref(1)
const mapIsVisible = ref(false)
const currentStreet = ref('')
const currentCoords = ref('')

chat.on('highway', (data) => {
  if (!user.isOwner(data)) {
    job.updateHighway(data)
  }
  console.info(job.highways)
})

const osmLink = computed(() => {
  return `https://www.openstreetmap.org/#map=${currentCoords.value}`
})

const mapillaryLink = computed(() => {
  const coords = currentCoords.value.split('/')
  const url = 'https://www.mapillary.com/app/'
  return `${url}?lat=${coords[1]}&lng=${coords[2]}&z=${coords[0]}`
})

const kartaLink = computed(() => {
  const coords = currentCoords.value.split('/')
  const url = 'https://kartaview.org/map/@'
  return `${url}${coords[1]},${coords[2]},${coords[0]}z`
})

function undoHandler(key) {
  const cat = job.callejero[key][0]
  const conv = job.callejero[key][1]
  job.postHighway(cat, conv)
}

function editHandler(value, key) {
  const cat = job.callejero[key][0]
  job.putHighway(cat, value)
}

function chatColor(row) {
  return row.length < 4 || !row[3] ? '' : 'chat-color-' + (row[3] % 32)
}

function highwayNames() {
  return job.callejero.map((row, i) => ({
    key: i,
    cat: row[0],
    src: row[2],
    conv: row[1],
    color: chatColor(row),
    username: row.length > 3 ? row[3] : '',
  }))
}

function deleteFilter() {
  filters.value.name.value = ''
}

function getOwner(row) {
  if (row.username) {
    return t('Edited by') + ' ' + row.username
  }
  return null
}

function showMap(street) {
  currentStreet.value = street
  mapIsVisible.value = true
}
</script>

<template>
  <quick-view v-model="mapIsVisible" classes="reviewmap is-left">
    <template #header>
      <p>
        <span class="title">{{ currentStreet }}</span>
        &nbsp;<a :href="osmLink" target="_blank">
          {{ $t('view_in_osm') }}
          <font-awesome-icon icon="external-link" /> </a
        >,
        <a :href="mapillaryLink" target="_blank">
          Mapillary
          <font-awesome-icon icon="external-link" /> </a
        >,
        <a :href="kartaLink" target="_blank">
          KartaView
          <font-awesome-icon icon="external-link" />
        </a>
      </p>
    </template>
    <template #body>
      <street-map v-model="currentCoords" :street="currentStreet"></street-map>
    </template>
  </quick-view>
  <vue-collapsible-panel
    class="panel"
    data-test="review"
    :class="{ 'is-info': job.estado == 'REVIEW' }"
    :expanded="job.estado == 'REVIEW'"
  >
    <template #title>
      <p class="panel-heading">{{ $t('Review street names') }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <p class="mt-1 mb-0 ml-2">
          <i18n-t keypath="reviewed_hgw" scope="global">
            <span>{{ job.callejero.length - job.highways }}</span>
            <span>{{ job.callejero.length }}</span>
          </i18n-t>
        </p>
        <div class="field has-addons has-addons-right ml-auto">
          <div class="control has-icons-right">
            <input
              ref="filterInput"
              v-model="filters.name.value"
              class="input"
              :placeholder="$t('Filter')"
            />
            <span class="icon is-right">
              <font-awesome-icon icon="search" />
            </span>
          </div>
          <div class="control">
            <a
              class="button has-tooltip-arrow has-tooltip-right"
              :data-tooltip="$t('Delete filter')"
              @click="deleteFilter"
            >
              <font-awesome-icon icon="times" />
            </a>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <VTable
          v-model:currentPage="currentPage"
          class="table is-narrow"
          :data="highwayNames()"
          :filters="filters"
          :page-size="12"
          @total-pages-changed="totalPages = $event"
        >
          <template #head>
            <tr>
              <VTh sort-key="cat" default-sort="asc">{{
                $t('Name in Cadastre')
              }}</VTh>
              <VTh sort-key="src">{{ $t('Origen') }}</VTh>
              <VTh sort-key="conv">{{ $t('Conversion') }}</VTh>
            </tr>
          </template>
          <template #body="{ rows }">
            <tr v-for="row in rows" :key="row.key" :class="row.color">
              <td
                class="is-clicklable is-valign-middle"
                @click="showMap(row.cat)"
              >
                <a>{{ row.cat }}</a>
              </td>
              <td
                class="is-clicklable is-valign-middle"
                @click="showMap(row.cat)"
              >
                {{ row.src }}
              </td>
              <td>
                <review-input
                  v-model="row.conv"
                  :model-key="row.key"
                  :tooltip="getOwner(row)"
                  :active="job.estado == 'REVIEW'"
                  :username="row.username"
                  @update:model-value="editHandler"
                  @undo:model-value="undoHandler"
                  @focus:input="showMap(row.cat)"
                ></review-input>
              </td>
            </tr>
          </template>
        </VTable>
      </div>
      <div class="panel-block is-pulled-right">
        <VTPagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :boundary-links="true"
        />
      </div>
    </template>
  </vue-collapsible-panel>
</template>

<style lang="scss">
.is-valign-middle {
  vertical-align: middle !important;
}
</style>
