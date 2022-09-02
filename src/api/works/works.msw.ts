/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const getGetWorksMock = () =>
  Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1
  ).map(() => ({
    id: faker.random.word(),
    date: faker.date.recent(),
    starting_time: {},
    ending_time: {},
    break_time: {},
    working_hours: faker.datatype.number({ min: undefined, max: undefined }),
    pay_amount: faker.datatype.number({ min: undefined, max: undefined }),
    memo: {},
    user_id: faker.random.word(),
    company_id: faker.random.word(),
    created_at: faker.random.word(),
    updated_at: faker.random.word(),
  }));

export const getWorksMSW = () => [
  rest.get("*/works", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getGetWorksMock())
    );
  }),
];
