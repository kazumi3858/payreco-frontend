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
  Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    id: faker.random.word(),
    name: faker.random.word(),
    hourly_wage_system: faker.datatype.boolean(),
    wage_amount: {},
    currency_type: faker.random.word(),
    user_id: faker.random.word(),
    deleted_at: {},
    created_at: faker.random.word(),
    updated_at: faker.random.word(),
  }));

export const getCompaniesMSW = () => [
  rest.get("*/companies", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getGetCompaniesMock())
    );
  }),
];
