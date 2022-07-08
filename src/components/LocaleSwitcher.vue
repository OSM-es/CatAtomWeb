<script setup>
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const localeNames = [
  { key: 'es', name: 'Español' },
  { key: 'ca', name: 'Catalán' },
  { key: 'en', name: 'English' },
]

function saveLocale(locale) {
  i18n.locale.value = locale
  localStorage.setItem('locale', locale)
}
</script>

<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ $t('locale') }}</a>
    <div class="navbar-dropdown is-right">
      <a
        v-for="locale in localeNames"
        :key="`locale-${locale.key}`"
        class="navbar-item"
        @click="saveLocale(locale.key)"
      >
        {{ locale.name }}
      </a>
    </div>
  </div>
</template>
