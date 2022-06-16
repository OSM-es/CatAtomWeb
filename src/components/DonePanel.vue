<script setup></script>

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
                Catastro de <span class="nom-municipio">Nombre de la zona</span>
              </td>
              <td>
                Cadastre of <span class="nom-municipio">Nombre de la zona</span>
              </td>
            </tr>
            <tr>
              <th>Descripción breve</th>
              <td>
                Importación de
                <span class="tipo-import">edificios y direcciones</span> de
                <span class="nom-municipio">Nombre de la zona</span>
              </td>
              <td>
                Import of
                <span class="tipo-import-en">buildings and addresses</span> of
                <span class="nom-municipio">Nombre de la zona</span>
              </td>
            </tr>
            <tr>
              <th>Descripción</th>
              <td>
                El trazado de edificios y las direcciones postales son datos de
                mucho valor para el mapa de OpenStreetMap. Actualmente no son
                muchos los municipios españoles que disponen de esta información
                y es por ello que desde OpenStreetMap España se está impulsando
                la importación de algunos de los datos catastrales. ¡Ayúdanos a
                que el mapa de OpenStreetMap sea todavía más útil!<br /><br />
                <p>
                  Consulta la [guía de
                  importación](https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gu%C3%ADa_de_importaci%C3%B3n)
                  para colaborar.
                </p>
              </td>

              <td>
                Building footprints and postal addresses are very valuable data
                for the OpenStreetMap map. Currently there are not many Spanish
                municipalities that have this information and that is why
                OpenStreetMap Spain is promoting the import of some of the
                cadastral data. Help us make the OpenStreetMap map even more
                useful!
              </td>
            </tr>
            <tr>
              <th>Objetos a cartografiar</th>
              <td>buildings[, addresses]</td>
              <td>buildings[, addresses]</td>
            </tr>
            <tr>
              <th>Comentario del conjunto de cambios</th>
              <td>
                #Spanish_Cadastre_Buildings_Import
                <span class="cod-municipio">Código municipio</span>
                <span class="nom-municipio">Nombre de la zona</span>
              </td>
              <td>
                #Spanish_Cadastre_Buildings_Import
                <span class="cod-municipio">Código municipio</span>
                <span class="nom-municipio">Nombre de la zona</span>
              </td>
            </tr>
            <tr>
              <th>Instrucciones detalladas</th>
              <td>
                Revisa la tarea siguiendo las instrucciones de la [guía de
                importación](https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gu%C3%ADa_de_importaci%C3%B3n).
              </td>
              <td>
                Review this task following the instructions in this [import
                guide](https://wiki.openstreetmap.org/wiki/Spanish
                Cadastre/Buildings Import/Import guide).
              </td>
            </tr>
            <tr>
              <th>Instrucciones adicionales para esta tarea</th>
              <td>
                Descarga el [archivo de la tarea](<span class="base-url"
                  >url</span
                >{muncode}/{localId}.osm.gz) o [Editar con Control Remoto de
                JOSM](http://localhost:8111/import?new_layer=true&amp;url=<span
                  class="base-url"
                  >url</span
                >results/{muncode}/{localId}.osm.gz).<br />
                Tipo: {type}. Complejidad: {parts} partes.<br />
                Revisa la tarea siguiendo las instrucciones de la [guía de
                importación](https://openstreetmap.es/catastro). Consulta las
                fotos de fachada de los edificios haciendo uso del complemento
                **pointinfo** que se activa con *Ctrl-Maýus-x*.
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
