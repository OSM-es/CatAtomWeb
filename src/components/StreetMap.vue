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
let images
let control
let viewer

function getImg(data) {
  const ref = data.localId.split('.').pop()
  const foto =
    'http://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral='
  return { src: foto + ref, alt: `${data.TN_text} ${data.designator}` }
}

function getViewer() {
  const options = {
    navbar: false,
    rotatable: false,
    scalable: false,
    title: [true, (image) => `${image.alt}`],
  }
  return viewerApi({ options, images })
}

function showImg(index) {
  viewer = getViewer()
  viewer.view(index)
}

watch(
  () => props.street,
  async (newStreet) => {
    const data = await job.getHighway(newStreet)
    let i = 0
    images = []
    if (layer) {
      map.removeLayer(layer)
      control.removeLayer(layer)
    }
    layer = leaflet.geoJSON(data, {
      onEachFeature: (feat, flayer) => {
        images.push(getImg(feat.properties))
        flayer.setIcon(
          new leaflet.DivIcon({
            className: 'portal',
            html: feat.properties.designator,
          })
        )
        flayer.on('click', (event) => {
          showImg(event.target.feature.properties.index)
        })
        feat.properties.index = i
        i += 1
      },
    })
    layer.addTo(map)
    control.addOverlay(layer, 'Fotos')
    map.fitBounds(layer.getBounds())
  }
)

onMounted(() => {
  map = leaflet.map('map').setView([51.505, -0.09], 13)
  const scne = leaflet.tileLayer.wms('http://www.ign.es/wms-inspire/ign-base', {
    layers: 'IGNBaseTodo',
    maxZoom: 19,
    attribution:
      '© <a href="http://www.scne.es">Sistema Cartográfico Nacional</a>',
  })
  const osm = leaflet
    .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/"OpenStreetMap</a>',
    })
    .addTo(map)
  control = leaflet.control.layers({ OSM: osm, 'IGN-Base': scne }).addTo(map)
})
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

.viewer-title::before {
  content: '© Dirección General de Catastro';
  display: block;
  margin-bottom: 1em;
  font-size: 12px;
}

.viewer-title {
  opacity: 100% !important;
  font-size: 16px !important;
  color: white !important;
  background-color: #00000033;
  padding: 0.2em 0.4em;
}

.viewer-backdrop {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
</style>
