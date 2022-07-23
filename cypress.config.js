const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'vue-cli',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:8080',
    //setupNodeEvents(on, config) {
    //  implement node event listeners here
    //},
  },

  video: false,
})
