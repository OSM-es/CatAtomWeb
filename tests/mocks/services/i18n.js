const localeNames = [
  { key: 'es', name: 'Español' },
  { key: 'ca', name: 'Catalá' },
  { key: 'en', name: 'English' },
]

const messages = {}
localeNames.forEach((l) => (messages[l.key] = { locale: l.name }))

const i18nConf = {
  locale: 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  messages,
}

const i18n = {
  t: (key) => key.toUpperCase(),
  te: (key) => key != 'not.exists',
}

module.exports = {
  t: i18n.t,
  te: i18n.te,
  i18nConf,
  localeNames,
  global: i18n,
  useI18n: () => i18n,
}
