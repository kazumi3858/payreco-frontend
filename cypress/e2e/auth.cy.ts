describe("Authentication", () => {
  it("should redirect to login page if user has not logged in", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });

  it("should redirect to main page if user has logged in", () => {
    cy.login();
    cy.visit("/login");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  after(() => {
    cy.logout();
  });
});
