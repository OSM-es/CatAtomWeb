<script setup>
import { nextTick, ref, watch } from "vue";
import { useJobStore } from "../stores/job";
import { useUserStore } from "../stores/user";

const job = useJobStore();
const user = useUserStore();
const processPanel = ref(null);

function isActive(panel) {
  const estado = job.data.estado;
  if (panel == "processPanel") {
    return estado == "AVAILABLE" || estado == "ERROR" || estado == "RUNNING";
  }
  if (panel == "reviewPanel") {
    return estado == "REVIEW";
  }
  if (panel == "fixmePanel") {
    return estado == "FIXME";
  }
  if (panel == "publishPanel") {
    return estado == "DONE";
  }
  return false;
}

watch(
  () => job.data.estado,
  async (estado) => {
    await nextTick();
    if (processPanel.value) {
      const expanded =
        estado == "AVAILABLE" || estado == "ERROR" || estado == "RUNNING";
      if (processPanel.value.isExpanded != expanded) {
        processPanel.value.toggle();
      }
    }
  }
);
</script>

<template>
  <vue-collapsible-panel-group>
    <vue-collapsible-panel
      ref="processPanel"
      class="panel"
      :class="isActive('processPanel') ? 'is-info' : ''"
      :expanded="isActive('processPanel')"
    >
      <template #title>
        <p class="panel-heading">1. Procesar</p>
      </template>
      <template #content>
        <div
          class="container"
          :class="
            isActive('processPanel') && job.data.estado != 'RUNNING'
              ? ''
              : 'is-disabled'
          "
        >
          <div class="panel-block">
            <div class="container">
              <label class="label">Opciones</label>
              <div class="checkbox">
                <label class="checkbox">
                  <input type="checkbox" v-model="job.data.edificios" />
                  Procesar edificios
                </label>
                <br />
                <label class="checkbox">
                  <input type="checkbox" v-model="job.data.direcciones" />
                  Procesar direcciones
                </label>
              </div>
              <div class="field">
                <label class="label">Idioma</label>
                <div class="control">
                  <div class="select">
                    <select v-model="job.data.idioma">
                      <option value="es_ES">Español</option>
                      <option value="ca_ES">Catalá</option>
                      <option value="gl_ES">Galego</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field">
              <label class="label">Estado</label>
              <div class="control">{{ job.data.mensaje }}</div>
            </div>
          </div>
          <div class="panel-block">
            <button
              class="button is-link is-outlined is-fullwidth"
              @click="$emit('updateProcess')"
            >
              Procesar
            </button>
          </div>
        </div>
      </template>
    </vue-collapsible-panel>
    <nav class="panel is-info" v-if="isActive('reviewPanel')">
      <div class="panel-heading">
        <p>2. Revisar callejero</p>
      </div>
      <div class="container">
        <div class="panel-block">
          <p>
            Edita los nombres de las calles mostrados en el panel siguiendo
            estas
            <a
              href="https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos#Revisi%C3%B3n_de_nombres_de_calles"
            >
              instrucciones.
            </a>
            Cuando termines continúa al siguiente paso.
          </p>
        </div>
        <div class="panel-block">
          <div class="container">
            <p v-if="!user.isOwner(job.data.propietario)">
              El proceso está bloqueado por
              <a
                :href="`https://www.openstreetmap.org/user/${job.data.propietario.username}`"
              >
                {{ job.data.propietario.username }}.
              </a>
            </p>
            <button
              class="button is-link is-outlined is-fullwidth"
              @click="$emit('updateProcess')"
              :disabled="!user.isOwner(job.data.propietario)"
            >
              Reprocesar
            </button>
          </div>
        </div>
      </div>
    </nav>
    <nav class="panel is-info" v-if="isActive('fixmePanel')">
      <div class="panel-heading">
        <p>2. Corregir errores</p>
      </div>
      <div id="fixmePanel" class="container">
        <div class="panel-block">
          <p v-if="job.data.revisar.length == 0">
            ¡Bien hecho!. Confirma para continuar.
          </p>
          <p v-else>
            Edita con JOSM los archivos mostrados en el panel siguiendo estas
            <a
              href="https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos#Generar_y_corregir_los_archivos_a_importar"
            >
              instrucciones.
            </a>
            <span v-if="job.data.revisar.length == 1">Falta 1 archivo.</span>
            <span v-else>Faltan {{ job.data.revisar.length }} archivos.</span>
          </p>
        </div>
        <div class="panel-block">
          <div class="container">
            <p v-if="!user.isOwner(job.data.propietario)">
              El proceso está bloqueado por
              <a
                :href="`https://www.openstreetmap.org/user/${job.data.propietario.username}`"
              >
                {{ job.data.propietario.username }}.
              </a>
            </p>
            <button
              class="button is-link is-outlined is-fullwidth"
              @click="$emit('updateProcess')"
              :disabled="
                job.data.revisar.length != 0 ||
                !user.isOwner(job.data.propietario)
              "
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </nav>
    <nav class="panel is-info" v-if="isActive('publishPanel')">
      <div class="panel-heading">
        <p>3. Publicar</p>
      </div>
      <div id="publishPanel" class="container">
        <div class="panel-block">
          <div class="content">
            <p>
              Crea un nuevo proyecto en el Gestor de tareas usando el archivo
              <a href="">zoning.geojson</a>.
            </p>
            <p>
              Completa los campos necesarios siguiendo la plantilla mostrada en
              el panel.
            </p>
            <p>Ver el <a href="">resultado del proceso</a>.</p>
          </div>
        </div>
      </div>
    </nav>
  </vue-collapsible-panel-group>
</template>
