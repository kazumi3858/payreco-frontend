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
