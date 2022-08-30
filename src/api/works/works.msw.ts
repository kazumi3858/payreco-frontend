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
    id: faker.helpers.arrayElement([faker.random.word(), undefined]),
    date: faker.date.recent(),
    starting_time: faker.helpers.arrayElement([{}, undefined]),
    ending_time: faker.helpers.arrayElement([{}, undefined]),
    break_time: faker.helpers.arrayElement([{}, undefined]),
    working_hours: faker.datatype.number({ min: undefined, max: undefined }),
    pay_amount: faker.datatype.number({ min: undefined, max: undefined }),
    memo: faker.helpers.arrayElement([faker.random.word(), undefined]),
    user_id: faker.random.word(),
    company_id: faker.random.word(),
    created_at: faker.helpers.arrayElement([faker.random.word(), undefined]),
    updated_at: faker.helpers.arrayElement([faker.random.word(), undefined]),
    company: {
      id: faker.helpers.arrayElement([faker.random.word(), undefined]),
      name: faker.random.word(),
      hourly_wage_system: faker.datatype.boolean(),
      wage_amount: faker.helpers.arrayElement([
        faker.datatype.number({ min: undefined, max: undefined }),
        undefined,
      ]),
      currency_type: faker.random.word(),
      user_id: faker.random.word(),
      created_at: faker.helpers.arrayElement([faker.random.word(), undefined]),
      updated_at: faker.helpers.arrayElement([faker.random.word(), undefined]),
    },
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
