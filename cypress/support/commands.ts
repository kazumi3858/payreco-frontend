import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: String(Cypress.env("CYPRESS_FIREBASE_API_KEY")),
  authDomain: Cypress.env("CYPRESS_FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("CYPRESS_FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("CYPRESS_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("CYPRESS_FIREBASE_MESSAGE_SENDER_ID"),
  appId: Cypress.env("CYPRESS_FIREBASE_APP_ID"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
