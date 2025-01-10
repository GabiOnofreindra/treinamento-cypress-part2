const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 120000, // 120 segundos
    defaultCommandTimeout: 10000, // 10 segundos para comandos como cy.get()
    screenshotOnRunFailure: true,
    screenshotTimeout: 70000,
    setupNodeEvents(on, config) {
    },
  },
  "chromeWebSecurity": false,
  "failOnStatusCode": false,
});
