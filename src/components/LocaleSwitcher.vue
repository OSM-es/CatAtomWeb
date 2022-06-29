<script setup>
import { useI18n } from "vue-i18n";

const i18n = useI18n();

i18n.locale.value = localStorage.getItem("locale") || "es_ES";

function saveLocale() {
  console.info(i18n.locale.value);
  localStorage.setItem("locale", i18n.locale.value);
}
</script>

<template>
  <div class="select">
    <select v-model="$i18n.locale" @change="saveLocale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale.substring(0, 2).toUpperCase() }}
      </option>
    </select>
  </div>
</template>
