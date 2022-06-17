<script setup>
import { useJobStore } from "@/stores/job";
import CopyIcon from "./CopyIcon.vue";

const job = useJobStore();

function downloadUrl() {
  return new URL(process.env.BASE_URL, window.location.href).href;
}
</script>

<template>
  <vue-collapsible-panel class="panel is-info">
    <template #title>
      <p class="panel-heading">Publicar</p>
    </template>
    <template #content>
      <div class="panel-block">
        <table class="table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Español (es)</th>
              <th>Inglés (en)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nombre del proyecto</th>
              <td>
                <copy-icon>Catastro de {{ job.nombreZona }}</copy-icon>
              </td>
              <td>
                <copy-icon>Cadastre of {{ job.nombreZona }}</copy-icon>
              </td>
            </tr>
            <tr>
              <th>Descripción breve</th>
              <td>
                <copy-icon>
                  Importación de {{ job.opciones }} de {{ job.nombreZona }}
                </copy-icon>
              </td>
              <td>
                <copy-icon>
                  Import of {{ job.options }} of {{ job.nombreZona }}
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>Descripción</th>
              <td>
                <copy-icon>
                  El trazado de edificios y las direcciones postales son datos
                  de mucho valor para el mapa de OpenStreetMap. Actualmente no
                  son muchos los municipios españoles que disponen de esta
                  información y es por ello que desde OpenStreetMap España se
                  está impulsando la importación de algunos de los datos
                  catastrales. ¡Ayúdanos a que el mapa de OpenStreetMap sea
                  todavía más útil!<br /><br />
                  Consulta la [guía de
                  importación](https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gu%C3%ADa_de_importaci%C3%B3n)
                  para colaborar.
                </copy-icon>
              </td>

              <td>
                <copy-icon>
                  Building footprints and postal addresses are very valuable
                  data for the OpenStreetMap map. Currently there are not many
                  Spanish municipalities that have this information and that is
                  why OpenStreetMap Spain is promoting the import of some of the
                  cadastral data. Help us make the OpenStreetMap map even more
                  useful!<br /><br />
                  Consult the [import
                  guide](https://wiki.openstreetmap.org/wiki/Spanish_Cadastre/Buildings_import
                  to contribute.
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>Objetos a cartografiar</th>
              <td>
                <copy-icon>{{ job.tags }}</copy-icon>
              </td>
              <td>
                <copy-icon>{{ job.tags }}</copy-icon>
              </td>
            </tr>
            <tr>
              <th>Comentario del conjunto de cambios</th>
              <td>
                <copy-icon>
                  #Spanish_Cadastre_Buildings_Import {{ job.cod_municipio }}
                  {{ job.nombreZona }}
                </copy-icon>
              </td>
              <td>
                <copy-icon>
                  #Spanish_Cadastre_Buildings_Import {{ job.cod_municipio }}
                  {{ job.nombreZona }}
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>Instrucciones detalladas</th>
              <td>
                <copy-icon>
                  Revisa la tarea siguiendo las instrucciones de la [guía de
                  importación](https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gu%C3%ADa_de_importaci%C3%B3n).
                </copy-icon>
              </td>
              <td>
                <copy-icon>
                  Review this task following the instructions in this [import
                  guide](https://wiki.openstreetmap.org/wiki/Spanish
                  Cadastre/Buildings Import/Import guide).
                </copy-icon>
              </td>
            </tr>
            <tr>
              <th>Instrucciones adicionales para esta tarea</th>
              <td>
                <copy-icon>
                  Descarga el [archivo de la tarea]({{
                    downloadUrl()
                  }}results/{muncode}/tasks/{localId}.osm.gz) o [Editar con
                  Control Remoto de
                  JOSM](http://localhost:8111/import?new_layer=true&amp;url={{
                    downloadUrl()
                  }}results/{muncode}/tasks/{localId}.osm.gz).<br />
                  Tipo: {type}. Complejidad: {parts} partes.<br />
                  Revisa la tarea siguiendo las instrucciones de la [guía de
                  importación](https://openstreetmap.es/catastro). Consulta las
                  fotos de fachada de los edificios haciendo uso del complemento
                  **pointinfo** que se activa con *Ctrl-Maýus-x*.
                </copy-icon>
              </td>
              <td>
                <i
                  >(Introduce el texto en español debido a un problema con el
                  gestor de tareas que muestra siempre el texto en inglés
                  independientemente de la configuración del usuario.)</i
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </vue-collapsible-panel>
</template>
