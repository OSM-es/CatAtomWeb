module.exports = {
  t: (key) => key.toUpperCase(),
  te: (key) => key != 'not.exists',
  localeNames: [
    { key: 'es', name: 'Español' },
    { key: 'ca', name: 'Catalá' },
    { key: 'en', name: 'English' },
  ],
  global: {
    t: (key) => key.toUpperCase(),
    te: (key) => key != 'not.exists',
  },
}
