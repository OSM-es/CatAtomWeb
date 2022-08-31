<script setup>
import { useJobStore } from '@/stores/job'
import CopyIcon from './CopyIcon.vue'

const job = useJobStore()
const titles = { b: 'Buildings', d: 'Addresses' }
const opciones = {
  b: 'edificios',
  d: 'direcciones',
  bd: 'edificios y direcciones',
}
const options = {
  b: 'buildings',
  d: 'addresses',
  bd: 'buildings and addresses',
}
const opcionesLng = {
  b: 'El trazado de edificios',
  d: 'Las direcciones postales',
  bd: 'El trazado de edificios y las direcciones postales',
}
const optionsLng = {
  b: 'Buildings footprints',
  d: 'Postal addresses',
  bd: 'Buildings footprints and postal addresses',
}

function downloadUrl() {
  let url = new URL(process.env.BASE_URL, window.location.href).href
  url += `${job.url}/{localId}.osm.gz`
  return url
}
</script>

<template>
  <vue-collapsible-panel class="panel is-info">
    <template #title>
      <p class="panel-heading">
        {{ $t('Publish') }}
        <span v-if="job.type == 'bd'">
          &nbsp;{{ $t(titles[job.options]).toLowerCase() }}
        </span>
      </p>
    </template>
    <template #content>
      <div class="panel-block table-container">
        <table class="table is-narrow">
          <thead>
            <tr>
              <th>{{ $t('Field') }}</th>
              <th>{{ $t('English (en)') }}</th>
              <th>{{ $t('Spanish (es)') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ $t('Name of the project') }}</th>
              <td>
                <copy-icon>Cadastre of {{ job.nombreZona }}</copy-icon>
              </td>
              <td>
                <copy-icon>Catastro de {{ job.nombreZona }}</copy-icon>
              </td>
            </tr>
            <tr>
              <th>{{ $t('Short description') }}</th>
              <td>
                <copy-icon>
                  Import of {{ options[job.options] }} of {{ job.nombreZona }}
                </copy-icon>
              </td>
              <td>
                <copy-icon>
                  Importación de {{ opciones[job.options] }} de
                  {{ job.nombreZona }}
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>{{ $t('Description') }}</th>
              <td class="cell-breakWord">
                <copy-icon>
                  {{ optionsLng[job.options] }} are very valuable OpenStreetMap
                  map. Currently there are not many Spanish municipalities that
                  have this information and that is why why OpenStreetMap Spain
                  is promoting the import of some of the cadastral data. Help us
                  make the OpenStreetMap map even more useful!<br /><br />
                  Consult the [import
                  guide](https://wiki.openstreetmap.org/wiki/Spanish_Cadastre/Buildings_import
                  to contribute.
                </copy-icon>
              </td>
              <td class="cell-breakWord">
                <copy-icon>
                  {{ opcionesLng[job.options] }} son datos de mucho valor para
                  el mapa de OpenStreetMap. Actualmente no son muchos los
                  municipios españoles que disponen de esta información y es por
                  ello que desde OpenStreetMap España se está impulsando la
                  importación de algunos de los datos catastrales. ¡Ayúdanos a
                  que el mapa de OpenStreetMap sea todavía más útil!<br /><br />
                  Consulta la [guía de
                  importación](https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gu%C3%ADa_de_importaci%C3%B3n)
                  para colaborar.
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>{{ $t('Changeset comment') }}</th>
              <td>
                <copy-icon>
                  #Spanish_Cadastre_Buildings_Import {{ job.cod_municipio }}
                  {{ job.nombreZona }}
                </copy-icon>
              </td>
              <td></td>
            </tr>
            <tr>
              <th>{{ $t('Detailed instructions') }}</th>
              <td class="cell-breakWord">
                <copy-icon>
                  Review this task following the instructions in this [import
                  guide](https://wiki.openstreetmap.org/wiki/Spanish
                  Cadastre/Buildings Import/Import guide).
                </copy-icon>
              </td>
              <td class="cell-breakWord">
                <copy-icon>
                  Revisa la tarea siguiendo las instrucciones de la [guía de
                  importación](https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gu%C3%ADa_de_importaci%C3%B3n).
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>{{ $t('Per task instructions') }}</th>
              <td class="cell-breakWord">
                <copy-icon>
                  Download the **[task file]({{ downloadUrl() }}) o [Editar con
                  Control Remoto de
                  JOSM](http://localhost:8111/import?new_layer=true&amp;url={{
                    downloadUrl()
                  }})**.<br />
                  Type: {type}. Complexity: {parts} parts.<br />
                  Review the task following the instructions in the [import
                  guide](https://openstreetmap.es/catastro). Check the facade
                  photos of the buildings using the **pointinfo** plugin that is
                  activated with *Ctrl-Shift-x*.
                </copy-icon>
              </td>
              <td>
                <copy-icon>
                  Descarga el [archivo de la tarea]({{ downloadUrl() }}) o
                  **[Editar con Control Remoto de
                  JOSM](http://localhost:8111/import?new_layer=true&amp;url={{
                    downloadUrl()
                  }})**.<br />
                  Tipo: {type}. Complejidad: {parts} partes.<br />
                  Revisa la tarea siguiendo las instrucciones de la [guía de
                  importación](https://openstreetmap.es/catastro). Consulta las
                  fotos de fachada de los edificios haciendo uso del complemento
                  **pointinfo** que se activa con *Ctrl-Maýus-x*.
                </copy-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </vue-collapsible-panel>
</template>

<style scoped>
.cell-breakWord {
  word-wrap: break-word;
  max-width: 1px;
  width: 42%;
}
</style>
