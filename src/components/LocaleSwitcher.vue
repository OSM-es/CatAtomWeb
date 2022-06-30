<script setup>
import { useI18n } from "vue-i18n";

const i18n = useI18n();

function getLocaleName(locale) {
  return i18n.getLocaleMessage(locale)["locale"].source;
}

function getCurrentLocaleName() {
  return getLocaleName(i18n.locale.value);
}

function saveLocale(locale) {
  i18n.locale.value = locale;
  localStorage.setItem("locale", locale);
}
</script>

<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ getCurrentLocaleName() }}</a>
    <div class="navbar-dropdown is-right">
      <a
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        @click="saveLocale(locale)"
        class="navbar-item"
      >
        {{ getLocaleName(locale) }}
      </a>
    </div>
  </div>
</template>
