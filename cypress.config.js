const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://timer.ivan-lim.com',
    env: {
    },
    pageLoadTimeout: 300000,
    specPattern: 'cypress/e2e/*',
    projectId: '828timerilcom',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
