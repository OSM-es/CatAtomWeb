<script setup>
import { ref, onBeforeUnmount } from "vue";
import api from "@/services/api";
import { useErrorStore } from "@/stores/error";
import { useJobStore } from "@/stores/job";
import { useProvStore } from "@/stores/provincias";
import { useChatService } from "@/services/chat";
import { useUserStore } from "@/stores/user";
import WatchSelect from "./WatchSelect.vue";

const errorStore = useErrorStore();
const job = useJobStore();
const chat = useChatService();
const userStore = useUserStore();
const provincias = useProvStore();
const provincia = ref(null);
const municipio = ref(null);
const division = ref(null);
let municipioPrevio = null;

chat.on("updateJob", () => {
  job.getJob(job.cod_municipio, job.cod_division).catch((err) => {
    errorStore.set(err);
  });
});

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

function getRoom(cod_municipio = municipio.value) {
  return {
    id: userStore.osmId,
    username: userStore.username,
    room: cod_municipio,
  };
}

function getJobStatus() {
  if (municipioPrevio && municipioPrevio != municipio.value) {
    chat.socket.emit("leave", getRoom(municipioPrevio));
  }
  job.$reset();
  if (municipio.value) {
    if (municipioPrevio != municipio.value) {
      chat.socket.emit("join", getRoom());
    }
    job
      .getJob(municipio.value, division.value || "")
      .then(() => {
        division.value = job.cod_division;
        municipioPrevio = municipio.value;
      })
      .catch((err) => errorStore.set(err));
  }
}

provincias.fetch().catch((err) => errorStore.set(err));

onBeforeUnmount(() => {
  chat.disconnect();
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
      :reduce="(mun) => mun && mun.cod_municipio"
      :fetch-options="fetchMunicipios"
      placeholder="Selecciona el municipio..."
      @update:modelValue="getJobStatus"
    ></watch-select>
    <watch-select
      v-if="
        !job.estado ||
        (job.estado == 'DONE' && job.report.split_name) ||
        job.estado == 'AVAILABLE' ||
        job.estado == 'ERROR'
      "
      :watched-value="municipio || ''"
      v-model="division"
      label="nombre"
      :reduce="(split) => split && split.osm_id"
      :fetch-options="fetchDivisiones"
      placeholder="Selecciona la división..."
      :clearable="true"
      @update:modelValue="getJobStatus"
    ></watch-select>
    <div class="control is-disabled" v-else>
      <input class="input" :value="job.report.split_name" />
    </div>
    <div class="notification is-info is-light" v-if="municipio === null">
      Selecciona una provincia y el municipio a procesar. Si existen divisiones
      administrativas del municipio (distritos o barrios), también puedes
      seleccionar una.
    </div>
  </div>
</template>
