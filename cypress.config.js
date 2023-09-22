const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dvhe6x',
  e2e: {
    // baseUrl: 'https://timer.ivan-lim.com',
    baseUrl: 'http://localhost:8800',
    env: {
    },
    pageLoadTimeout: 300000,
    specPattern: 'cypress/e2e/*',
    projectName: 'timer-nuxt',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
