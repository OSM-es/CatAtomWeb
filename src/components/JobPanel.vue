<script setup>
import { ref, onMounted } from "vue";
import api from "@/api";
import { useErrorStore } from "@/stores/error";
import { useJobStore } from "@/stores/job";
import { useProvStore } from "@/stores/provincias";
import WatchSelect from "./WatchSelect.vue";

const errorStore = useErrorStore();
const job = useJobStore();
const provincias = useProvStore();
const provincia = ref(null);
const municipio = ref(null);
const division = ref(null);

async function fetchMunicipios(prov) {
  try {
    const response = await api.getProv(prov);
    return response.data.municipios.map((mun) => ({
      cod_municipio: mun.cod_municipio,
      nombre: mun.nombre,
      label: mun.cod_municipio + " " + mun.nombre,
    }));
  } catch (err) {
    errorStore.set(err);
  }
  return [];
}

async function fetchDivisiones(mun) {
  try {
    const response = await api.getMun(mun);
    return response.data.divisiones;
  } catch (err) {
    errorStore.set(err);
  }
  return [];
}

function getJobStatus() {
  if (municipio.value === null) {
    job.$reset();
  } else {
    const cod_municipio = municipio.value.cod_municipio;
    const cod_division = division.value === null ? "" : division.value.osm_id;
    job.getJob(cod_municipio, cod_division).catch((err) => errorStore.set(err));
  }
}

onMounted(() => {
  provincias.fetch().catch((err) => errorStore.set(err));
});
</script>

<template>
  <div class="box">
    <div class="field">
      <div class="control">
        <v-select
          placeholder="Selecciona la provincia..."
          :options="provincias.get"
          :clearable="false"
          :selectOnTab="true"
          v-model="provincia"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars  -->
          <template #no-options="{ search, searching, loading }">
            Lo siento, opción no encontrada.
          </template>
        </v-select>
      </div>
    </div>
    <watch-select
      :watched-value="provincia ? provincia.cod_provincia : ''"
      v-model="municipio"
      :fetch-options="fetchMunicipios"
      placeholder="Selecciona el municipio..."
      @update:modelValue="getJobStatus"
    ></watch-select>
    <watch-select
      :watched-value="municipio ? municipio.cod_municipio : ''"
      v-model="division"
      :fetch-options="fetchDivisiones"
      placeholder="Selecciona la división..."
      :clearable="true"
      label="nombre"
      @update:modelValue="getJobStatus"
    ></watch-select>
    <div class="notification is-info is-light" v-if="municipio === null">
      Selecciona una provincia y el municipio a procesar. Si existen divisiones
      administrativas del municipio (distritos o barrios), también puedes
      seleccionar una.
    </div>
  </div>
</template>
