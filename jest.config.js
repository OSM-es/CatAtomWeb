module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  resetModules: true,
  clearMocks: true,
  setupFiles: ['jest-localstorage-mock'],
}
