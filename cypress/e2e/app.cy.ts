/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Home", () => {
  beforeEach(() => {
    cy.log(Cypress.env("SERVICE_ACCOUNT"))
    cy.log(Cypress.env("TEST_TEST"))
    cy.login();
  });
  it("should navigate to the about page", () => {
    cy.visit("/");
    cy.contains("日の予定");
  });
  afterEach(() => {
    cy.logout();
  });
});
