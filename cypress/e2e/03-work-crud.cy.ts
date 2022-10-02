import { format } from "date-fns";

describe("Work CRUD function", () => {
  const timeValue = (time: string) =>
    format(new Date(), `yyyy-MM-dd ${time}`).replace(" ", "T");

  before(() => {
    cy.login();
    cy.createCompanies();
  });

  it("can render input for pay amount when hourly wage system is true", () => {
    cy.visit("/");
    cy.contains("button", "株式会社ジキュウ").click();
    cy.get("#pay").should("not.exist");
    cy.get("body").click(0, 0);
    cy.contains("button", "株式会社ニッキュウ").click();
    cy.get("#pay").should("be.visible");
  });

  it("can validate incorrect work time", () => {
    cy.visit("/");
    cy.contains("button", "株式会社ジキュウ").click();
    cy.get("#starting-time").clear().type(timeValue(`07:59`));
    cy.get("#ending-time").clear().type(timeValue(`08:00`));
    cy.contains("合計時間が正しくありません。").should("not.exist");
    cy.get("#starting-time").clear().type(timeValue(`08:00`));
    cy.get("#ending-time").clear().type(timeValue(`07:59`));
    cy.contains("合計時間が正しくありません。");
    cy.contains("input", "保存").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("合計時間が正しくありません。");
    });
  });

  it("can validate incorrect memo", () => {
    cy.visit("/");
    cy.contains("button", "株式会社ジキュウ").click();
    cy.get("#memo").type("あ".repeat(50));
    cy.contains("メモは50文字以内に収めてください。").should("not.exist");
    cy.get("#memo").clear().type("あ".repeat(51));
    cy.contains("メモは50文字以内に収めてください。");
    cy.contains("input", "保存").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("メモは50文字以内に収めてください。");
    });
  });

  it("can validate incorrect pay amount", () => {
    cy.visit("/");
    cy.contains("button", "株式会社ニッキュウ").click();
    cy.get("#pay").type("999999");
    cy.contains("金額が不正な値・または大きすぎます。").should("not.exist");
    cy.get("#pay").clear().type("1000000");
    cy.contains("金額が不正な値・または大きすぎます。");
    cy.contains("input", "保存").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("金額が不正な値・または大きすぎます。");
    });
  });

  it("can post work", () => {
    cy.visit("/");
    cy.contains("予定はありません。").should("have.length", 1);
    cy.contains("button", "株式会社ジキュウ").click();
    cy.get("#starting-time").clear().type(timeValue(`10:00`));
    cy.get("#ending-time").clear().type(timeValue(`18:00`));
    cy.get("select").first().select("1");
    cy.contains("input", "保存").click();
    cy.contains("保存").should("not.exist");
    cy.contains("10:00 AM - 6:00 PM");
    cy.contains("株式会社ジキュウ");
    cy.contains("7000円");
    cy.contains("予定はありません。").should("have.length", 0);
  });

  it("can reflect income list after posting", () => {
    cy.visit("/income");
    cy.contains("合計: 7,000円");
  });

  it("can update work", () => {
    cy.visit("/");
    cy.contains("10:00 AM - 6:00 PM");
    cy.contains("7時間");
    cy.get('button[title="編集"]').click();
    cy.contains("合計勤務時間のみ入力").click();
    cy.get("select").eq(2).select("5");
    cy.contains("input", "保存").click();
    cy.contains("保存").should("not.exist");
    cy.contains("10:00 AM - 6:00 PM").should("not.exist");
    cy.contains("5時間");
  });

  it("can delete work", () => {
    cy.visit("/");
    cy.contains("5時間").should("have.length", 1);
    cy.get('button[title="削除"]').click();
    cy.contains("button", "はい").click();
    cy.contains("はい").should("not.exist");
    cy.contains("5時間").should("have.length", 0);
  });

  it("can reflect income list after deleting", () => {
    cy.visit("/income");
    cy.contains("合計: 0円");
  });

  after(() => {
    cy.deleteCompanies();
    cy.logout();
  });
});
