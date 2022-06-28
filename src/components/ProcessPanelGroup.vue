<script setup>
import { nextTick, ref, watch } from "vue";
import ProcessButton from "./ProcessButton";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";
import { useErrorStore } from "@/stores/error";

const wikiUrl =
  "https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos#Revisi%C3%B3n_de_nombres_de_calles";
const job = useJobStore();
const user = useUserStore();
const errorStore = useErrorStore();
const processPanel = ref(null);

function isActive(panel) {
  const estado = job.estado;
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

function tasksUrl() {
  return `results/${job.cod_municipio}/tasks`;
}

function zoningUrl() {
  if (job.cod_division) {
    return `results/${job.cod_municipio}/tasks/${job.cod_division}/zoning.geojson`;
  } else {
    return `results/${job.cod_municipio}/zoning.geojson`;
  }
}

function exportJobUrl() {
  return process.env.VUE_APP_ROOT_API + "/export/" + job.cod_municipio;
}

function updateLog() {
  job
    .getJob(job.cod_municipio, job.cod_division)
    .then(() => {
      if (job.estado == "RUNNING") {
        setTimeout(() => {
          updateLog();
        }, 500);
      }
    })
    .catch((err) => errorStore.set(err));
}

function processJob() {
  job
    .createJob()
    .then(updateLog)
    .catch((err) => errorStore.set(err));
}

function deleteJob() {
  job.deleteJob().catch((err) => errorStore.set(err));
}

watch(
  () => job.estado,
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
            isActive('processPanel') && job.estado != 'RUNNING'
              ? ''
              : 'is-disabled'
          "
        >
          <div class="panel-block">
            <div class="container">
              <label class="label">Opciones</label>
              <div class="checkbox">
                <label class="checkbox">
                  <input type="checkbox" v-model="job.edificios" />
                  Procesar edificios
                </label>
                <br />
                <label class="checkbox">
                  <input type="checkbox" v-model="job.direcciones" />
                  Procesar direcciones
                </label>
              </div>
              <div class="field">
                <label class="label">Idioma</label>
                <div class="control">
                  <div class="select">
                    <select v-model="job.idioma">
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
              <div class="control">{{ job.mensaje }}</div>
            </div>
          </div>
          <div class="panel-block">
            <process-button @click="processJob()">Procesar</process-button>
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
            estas <a :href="wikiUrl">instrucciones</a>. Cuando termines continúa
            al siguiente paso.
          </p>
        </div>
        <div class="panel-block">
          <div class="container">
            <process-button @click="processJob()">Reprocesar</process-button>
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
          <p v-if="job.revisar.length == 0">
            ¡Bien hecho!. Confirma para continuar.
          </p>
          <p v-else>
            Edita con JOSM los archivos mostrados en el panel siguiendo estas
            <a :href="wikiUrl"> instrucciones</a>. Guarda los resultados y sube
            los archivos corregidos.
          </p>
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
              <a :href="zoningUrl()">zoning.geojson</a>.
            </p>
            <p>
              Completa los campos necesarios siguiendo la plantilla mostrada en
              el panel.
            </p>
            <p>Ver el <a :href="tasksUrl()">resultado del proceso</a>.</p>
          </div>
        </div>
      </div>
    </nav>
    <vue-collapsible-panel
      class="panel"
      :expanded="false"
      v-if="user.isOwner(job.propietario) && job.estado != 'RUNNING'"
    >
      <template #title>
        <p class="panel-heading">Administrar</p>
      </template>
      <template #content>
        <div class="container">
          <div class="panel-block" v-if="job.estado != 'REVIEW'">
            <div class="content">
              <p>
                Descarga los resultados del trabajo como copia de seguridad.
              </p>
              <a
                class="button is-link is-outlined is-fullwidth"
                :href="exportJobUrl()"
              >
                Exportar
              </a>
            </div>
          </div>
          <div class="panel-block">
            <div class="content">
              <p>Eliminar el proceso (cuidado, acción no reversible).</p>
              <button
                class="button is-link is-outlined is-fullwidth"
                @click="deleteJob"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </template>
    </vue-collapsible-panel>
  </vue-collapsible-panel-group>
</template>
