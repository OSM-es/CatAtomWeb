<script setup>
import axios from 'axios'
import osmtogeojson from 'osmtogeojson'
import { onMounted, watch } from 'vue'
import leaflet from 'leaflet'
import { api as viewerApi } from 'v-viewer'
import { useJobStore } from '@/stores/job'

// eslint-disable-next-line no-undef
const props = defineProps({
  street: { type: String, default: '' },
  modelValue: { type: String, default: '' },
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])
const job = useJobStore()

let map
let portales
let viales
let images
let control
let viewer

const colors = [
  '#228b22',
  '#800000',
  '#556b2f',
  '#808080',
  '#483d8b',
  '#b8860b',
  '#008b8b',
  '#000080',
  '#4682b4',
  '#32cd32',
  '#7f007f',
  '#8fbc8f',
  '#ff4500',
  '#ff8c00',
  '#ffff00',
  '#00ff00',
  '#8a2be2',
  '#e9967a',
  '#dc143c',
  '#00ffff',
  '#0000ff',
  '#adff2f',
  '#da70d6',
  '#d8bfd8',
  '#ff00ff',
  '#1e90ff',
  '#db7093',
  '#f0e68c',
  '#87ceeb',
  '#ff1493',
  '#7b68ee',
  '#98fb98',
]

function checksum(s) {
  var chk = 0x12345678
  var len = s.length
  for (var i = 0; i < len; i++) {
    chk += s.charCodeAt(i) * (i + 1)
  }
  return chk & 0xffffffff
}

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

async function getPortales(street) {
  const data = await job.getHighway(street)
  let i = 0
  images = []
  if (portales) {
    map.removeLayer(portales)
    control.removeLayer(portales)
  }
  portales = leaflet.geoJSON(data, {
    onEachFeature: (feat, path) => {
      images.push(getImg(feat.properties))
      path.setIcon(
        new leaflet.DivIcon({
          className: 'portal',
          html: feat.properties.designator,
        })
      )
      path.on('click', (event) => {
        showImg(event.target.feature.properties.index)
      })
      feat.properties.index = i
      i += 1
    },
  })
  portales.addTo(map)
  control.addOverlay(portales, 'Portales')
  map.fitBounds(portales.getBounds())
  const coords = map.getCenter()
  emit('update:modelValue', `${map.getZoom()}/${coords.lat}/${coords.lng}`)
  getViales()
}

async function getViales() {
  if (viales) {
    map.removeLayer(viales)
    control.removeLayer(viales)
  }
  const bounds = portales.getBounds()
  const bb = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`
  const ql = `data=[out:json][timeout:250];(way["highway"]["name"](${bb});relation["highway"]["name"](${bb});way["place"="square"]["name"](${bb});relation["place"="square"]["name"](${bb}););out body;>;out skel qt;`
  const response = await axios.get(process.env.VUE_APP_OSM3S_URL + ql)
  const data = osmtogeojson(response.data)
  viales = leaflet.geoJSON(data, {
    onEachFeature: (feat, path) => {
      const i = checksum(feat.properties.name) % 32
      path.setStyle({ color: colors[i] })
      path.bindTooltip(feat.properties.name)
    },
  })
  viales.addTo(map)
  control.addOverlay(viales, 'Viales')
}

watch(
  () => props.street,
  (newStreet) => {
    getPortales(newStreet)
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
        '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
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
