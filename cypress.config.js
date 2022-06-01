const { defineConfig } = require('cypress')

module.exports = defineConfig({
  trashAssetsBeforeRuns: true,
  video: false,
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    charts: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.trt13.jus.br/contaspublicasng',
  },
})
