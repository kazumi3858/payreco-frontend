describe("Income list", () => {
  before(() => {
    cy.login();
    cy.createCompanyAndWork();
  });

  it("can set target amount", () => {
    cy.visit("/income");
    cy.get("#target").clear().type("50000");
    cy.contains("input", "保存").click();
    cy.contains("今月の目標達成率");
    cy.contains("本日まで: 20%");
  });

  after(() => {
    cy.deleteCompanyAndWork();
    cy.logout();
  });
});
