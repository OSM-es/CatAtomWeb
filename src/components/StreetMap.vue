<script setup>
import { onMounted, watch } from 'vue'
import leaflet from 'leaflet'
import { api as viewerApi } from 'v-viewer'
import { useJobStore } from '@/stores/job'

// eslint-disable-next-line no-undef
const props = defineProps({
  street: { type: String, default: '' },
})
const job = useJobStore()

let map
let layer

watch(
  () => props.street,
  async (newStreet) => {
    const data = await job.getHighway(newStreet)
    console.info(data)
    if (layer) {
      map.removeLayer(layer)
    }
    layer = leaflet.geoJSON(data, {
      onEachFeature: (feat, flayer) => {
        flayer.setIcon(
          new leaflet.DivIcon({
            className: 'portal',
            html: feat.properties.designator,
          })
        )
        flayer.on('click', (event) => {
          showImg(event.target.feature.properties.localId)
        })
      },
    })
    layer.addTo(map)
    map.fitBounds(layer.getBounds())
  }
)

onMounted(() => {
  map = leaflet.map('map').setView([51.505, -0.09], 13)
  leaflet
    .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    })
    .addTo(map)
})

function showImg(localId) {
  const ref = localId.split('.').pop()
  const foto =
    'http://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral='
  const options = {
    navbar: false,
    rotatable: false,
    scalable: false,
    title: [true, () => '© Dirección General de Catastro'],
  }
  viewerApi({ options, images: [foto + ref] })
}
</script>

<template>
  <div id="map" class="hero is-fullheight-with-navbar"></div>
</template>

<style lang="scss">
.portal {
  width: auto;
  height: auto !important;
  min-width: 2em;
  text-align: center;
  font-size: 1.5em;
  padding: 0.25em;
  border-radius: 0.25em;
  color: white;
  background-color: #dc143c80;
  border: 1px solid #dc143c;
}

.viewer-title {
  opacity: 100% !important;
  color: white !important;
}

.viewer-backdrop {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
</style>
