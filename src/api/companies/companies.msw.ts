/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const getGetCompaniesMock = () =>
  Array.from({ length: 3 }, (_, i) => i + 1).map((_, i) => ({
    id: "companyId" + (i + 1),
    name: "株式会社" + (i === 0 ? "abc" : faker.random.word()),
    hourly_wage_system: i % 2 === 0 ? true : false,
    wage_amount: i % 2 === 0 ? 10 : null,
    currency_type: faker.helpers.arrayElement(["米ドル", "ユーロ", "英ポンド"]),
    user_id: "userId",
    deleted_at: null,
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  }));

export const getCompanyMock = [
  {
    id: "companyId1",
    name: "株式会社山田",
    hourly_wage_system: true,
    wage_amount: 1500,
    currency_type: "円",
    user_id: "userId",
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const getCompaniesMSW = () => [
  rest.get("*/companies", (_req, res, ctx) => {
    return res(ctx.json(getCompanyMock));
  }),
];
