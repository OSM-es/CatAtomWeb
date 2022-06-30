<script setup>
import { ref, onBeforeUnmount } from "vue";
import api from "@/services/api";
import { useErrorStore } from "@/stores/error";
import { useJobStore } from "@/stores/job";
import { useProvStore } from "@/stores/provincias";
import { useChatService } from "@/services/chat";
import { useUserStore } from "@/stores/user";
import WatchSelect from "./WatchSelect.vue";

const wikiUrl =
  "https://wiki.openstreetmap.org/wiki/ES:Tag:boundary%3Dadministrative";
const errorStore = useErrorStore();
const job = useJobStore();
const chat = useChatService();
const userStore = useUserStore();
const provincias = useProvStore();
const provincia = ref(null);
const municipio = ref(null);
const division = ref(null);
let municipioPrevio = null;

chat.on("updateJob", (msg) => {
  if (!msg.startsWith("log") || !userStore.isOwner(job.propietario)) {
    job.getJob(job.cod_municipio, job.cod_division).catch((err) => {
      errorStore.set(err);
    });
  }
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
    job.$reset();
    chat.socket.emit("leave", getRoom(municipioPrevio));
  }
  if (municipio.value) {
    if (municipioPrevio != municipio.value) {
      job.$reset();
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
          :placeholder="$t('Select the province')"
          :options="provincias.get"
          :clearable="false"
          :selectOnTab="true"
          v-model="provincia"
        >
          <!-- eslint-disable-next-line vue/no-unused-vars  -->
          <template #no-options="{ search, searching, loading }">
            {{ $t("Sorry, no matching option") }}
          </template>
        </v-select>
      </div>
    </div>
    <watch-select
      :watched-value="provincia ? provincia.cod_provincia : ''"
      v-model="municipio"
      :reduce="(mun) => mun && mun.cod_municipio"
      :fetch-options="fetchMunicipios"
      :placeholder="$t('Select the municipality')"
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
      :placeholder="$t('Select the subarea')"
      :clearable="true"
      @update:modelValue="getJobStatus"
    ></watch-select>
    <div class="control is-disabled" v-else>
      <input class="input" :value="job.report.split_name" />
    </div>
    <div class="notification is-info is-light" v-if="municipio === null">
      <i18n-t keypath="select_job" scope="global">
        <a :href="wikiUrl">{{ $t("admin boundaries") }}</a>
      </i18n-t>
    </div>
  </div>
</template>
