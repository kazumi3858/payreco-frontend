/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const getGetUsersUserIdMock = () => ({
  id: faker.random.word(),
  uid: faker.random.word(),
  name: faker.random.word(),
  target_amount: faker.helpers.arrayElement([
    faker.datatype.number({ min: undefined, max: undefined }),
    undefined,
  ]),
  created_at: faker.random.word(),
  updated_at: faker.random.word(),
});

export const getUsersMSW = () => [
  rest.get("*/users/:userId", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, "Mocked status"),
      ctx.json(getGetUsersUserIdMock())
    );
  }),
  rest.post("*/users", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
];
