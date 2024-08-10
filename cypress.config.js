const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;
require('dotenv').config({ path: './.env' });

module.exports = defineConfig({
  env: {
    paylocity_user: process.env.PAYLOCITY_USER,
    paylocity_pass: process.env.PAYLOCITY_PASS,
    paylocity_api_key: process.env.PAYLOCITY_API_KEY
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber());
    },
    //Updating configurations to support BDD
    screenshotOnRunFailure: true,
    specPattern: 'cypress/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/'
  },
});
