/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Home", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should navigate to the main page", () => {
    cy.visit("/");
    cy.contains("日の予定");
  });

  it("should navigate to the logout button", () => {
    cy.visit("/");
    cy.contains("Menu").click();
    cy.contains("ログアウト");
  });

  afterEach(() => {
    cy.logout();
  });
});
