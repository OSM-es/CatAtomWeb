const i18n = {
  t: (key) => key.toUpperCase(),
  te: (key) => key != 'not.exists',
}

module.exports = {
  t: i18n.t,
  te: i18n.te,
  localeNames: [
    { key: 'es', name: 'Español' },
    { key: 'ca', name: 'Catalá' },
    { key: 'en', name: 'English' },
  ],
  global: i18n,
  useI18n: () => i18n,
}
