import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: Cypress.env("FIREBASE_API_KEY"),
  authDomain: Cypress.env("FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("FIREBASE_MESSAGE_SENDER_ID"),
  appId: Cypress.env("FIREBASE_APP_ID"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

declare global {
  namespace Cypress {
    interface Chainable {
      createCompanyAndWork: typeof createCompanyAndWork;
      createCompanies: typeof createCompanies;
      deleteCompanyAndWork: typeof deleteCompanyAndWork;
      deleteCompanies: typeof deleteCompanies;
    }
  }
}

const createCompanyAndWork = () => {
  cy.visit("/");
  cy.contains("button", "勤務先を追加する").click();
  cy.get("#name").type("株式会社ニッキュウ");
  cy.contains("日給制").click();
  cy.contains("input", "保存").click();
  cy.contains("button", "株式会社ニッキュウ").click();
  cy.contains("合計勤務時間のみ入力").click();
  cy.get("select").eq(2).select("5");
  cy.get("#pay").type("10000");
  cy.contains("input", "保存").click();
  cy.contains("●");
};

const createCompanies = () => {
  cy.visit("/");
  cy.contains("button", "勤務先を追加する").click();
  cy.get("#name").type("株式会社ジキュウ");
  cy.get("#wage").type("1000");
  cy.contains("input", "保存").click();
  cy.contains("button", "勤務先を追加する").click();
  cy.get("#name").type("株式会社ニッキュウ");
  cy.contains("日給制").click();
  cy.contains("input", "保存").click();
};

const deleteCompanyAndWork = () => {
  cy.visit("/companies");
  cy.get('button[title="削除"]').click();
  cy.contains("button", "はい").click();
  cy.contains("株式会社ニッキュウ").should("have.length", 0);
  cy.visit("/");
  cy.contains("●").click();
  cy.get('button[title="削除"]').click();
  cy.contains("button", "はい").click();
  cy.contains("株式会社ニッキュウ").should("have.length", 0);
};

const deleteCompanies = () => {
  cy.visit("/companies");
  cy.get('button[title="削除"]').first().click();
  cy.contains("button", "はい").click();
  cy.contains("株式会社").should("have.length", 1);
  cy.reload();
  cy.get('button[title="削除"]').click();
  cy.contains("button", "はい").click();
  cy.contains("株式会社").should("have.length", 0);
};

Cypress.Commands.add("createCompanyAndWork", createCompanyAndWork);
Cypress.Commands.add("createCompanies", createCompanies);
Cypress.Commands.add("deleteCompanyAndWork", deleteCompanyAndWork);
Cypress.Commands.add("deleteCompanies", deleteCompanies);
