describe("Account related function", () => {
  before(() => {
    cy.login();
    cy.createCompanyAndWork();
  });

  it("should still have saved data", () => {
    cy.visit("/");
    cy.contains("株式会社ニッキュウ");
  });

  it("should delete saved data when user delete account", () => {
    cy.visit("/");
    cy.contains("退会方法").click();
    cy.contains("退会する").click();
    cy.on("window:confirm", (text) => {
      expect(text).to.contains(
        "全てのデータが消えてしまいますが退会しますか？"
      );
    });
    cy.on("window:confirm", () => true);
  });

  it("should not have saved data anymore", () => {
    cy.contains("ログイン").click();
    cy.contains("日の予定");
    cy.contains("株式会社ニッキュウ").should("not.exist");
  });

  after(() => {
    cy.logout();
  });
});
