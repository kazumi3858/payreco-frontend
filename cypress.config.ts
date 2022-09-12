import admin from "firebase-admin";
import { defineConfig } from "cypress";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";

export default defineConfig({
  e2e: {
    projectId: "vkw228",
    baseUrl: "https://payreco.vercel.app/",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);
    },
  },
});
