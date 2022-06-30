<script setup>
import { useI18n } from "vue-i18n";

const i18n = useI18n();

const locale =
  localStorage.getItem("locale") ||
  (navigator.languages ? navigator.languages[0] : navigator.language) ||
  "es-ES";

i18n.locale.value = locale;
localStorage.setItem("locale", locale);

function saveLocale() {
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
