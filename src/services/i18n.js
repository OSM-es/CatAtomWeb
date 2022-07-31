import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
  const locales = require.context(
    '@/locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages = {}
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}

let currentLocale = (
  localStorage.getItem('locale') ||
  (navigator.languages ? navigator.languages[0] : navigator.language) ||
  process.env.VUE_APP_I18N_LOCALE ||
  'es'
).substring(0, 2)
localStorage.setItem('locale', currentLocale)

const messages = loadLocaleMessages()

export const localeNames = Object.keys(messages).map((key) => ({
  key,
  name: messages[key].locale({ normalize: (msg) => msg[0] }),
}))

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: currentLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'es',
  messages,
})
