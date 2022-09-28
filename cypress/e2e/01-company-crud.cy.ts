describe("Company CRUD function", () => {
  before(() => {
    cy.login();
  });

  it("can validate incorrect name", () => {
    cy.visit("/companies");
    cy.contains("button", "勤務先を追加する").click();
    cy.get("#name").type("あ".repeat(30));
    cy.contains("名前は1～30文字にしてください。").should("not.exist");
    cy.get("#name").clear().type("あ".repeat(31));
    cy.contains("名前は1～30文字にしてください。");
    cy.contains("input", "保存").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("名前は1～30文字にしてください。");
    });
  });

  it("can validate incorrect wage amount", () => {
    cy.visit("/companies");
    cy.contains("button", "勤務先を追加する").click();
    cy.get("#wage").type("99999");
    cy.contains("時給額が不正な値・または大きすぎます。").should("not.exist");
    cy.get("#wage").clear().type("100000");
    cy.contains("時給額が不正な値・または大きすぎます。");
    cy.contains("input", "保存").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("時給額が不正な値・または大きすぎます。");
    });
  });

  it("can post company", () => {
    cy.visit("/companies");
    cy.contains("株式会社ジキュウ").should("have.length", 0);
    cy.contains("button", "勤務先を追加する").click();
    cy.get("#name").type("株式会社ジキュウ");
    cy.get("#wage").type("15");
    cy.get("select").select("米ドル");
    cy.contains("input", "保存").click();
    cy.contains("保存").should("not.exist");
    cy.contains("株式会社ジキュウ").should("have.length", 1);
  });

  it("can update company", () => {
    cy.visit("/companies");
    cy.contains("株式会社ジキュウ");
    cy.contains("時給15米ドル");
    cy.contains("button", "編集").click();
    cy.get("#name").clear().type("株式会社ニッキュウ");
    cy.contains("日給制").click();
    cy.contains("input", "保存").click();
    cy.contains("保存").should("not.exist");
    cy.contains("株式会社ニッキュウ");
    cy.contains("日給制");
  });

  it("can delete company", () => {
    cy.visit("/companies");
    cy.contains("株式会社ニッキュウ").should("have.length", 1);
    cy.contains("button", "削除").click();
    cy.contains("button", "はい").click();
    cy.contains("はい").should("not.exist");
    cy.contains("株式会社ニッキュウ").should("have.length", 0);
  });

  after(() => {
    cy.logout();
  });
});
