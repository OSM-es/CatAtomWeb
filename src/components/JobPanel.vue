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

chat.on("updateJob", (data) => {
  console.info("updateJob", data);
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

function getRoom(cod_municipio = municipio.value.cod_municipio) {
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
  if (municipio.value === null) {
    job.$reset();
  } else {
    const cod_municipio = municipio.value.cod_municipio;
    const cod_division = division.value === null ? "" : division.value.osm_id;
    if (!cod_division) {
      chat.socket.emit("join", getRoom(), (response) => {
        console.info("emit join", response);
      });
    }
    municipioPrevio = cod_municipio;
    job.getJob(cod_municipio, cod_division).catch((err) => errorStore.set(err));
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
      :fetch-options="fetchMunicipios"
      placeholder="Selecciona el municipio..."
      @update:modelValue="getJobStatus"
    ></watch-select>
    <watch-select
      v-if="!job.report.split_name"
      :watched-value="municipio ? municipio.cod_municipio : ''"
      v-model="division"
      :fetch-options="fetchDivisiones"
      placeholder="Selecciona la división..."
      :clearable="true"
      label="nombre"
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
