/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";

const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() - 1;

export const getGetWorksMock = () =>
  Array.from({ length: 10 }, (_, i) => i + 1).map((_, i) => ({
    id: "workId" + (i + 1),
    date: new Date(thisYear, thisMonth, i + 1),
    starting_time: new Date(thisYear, thisMonth, i + 1, 8, 0),
    ending_time: new Date(thisYear, thisMonth, i + 1, 16, 0),
    break_time: 60,
    working_hours: 7.0,
    pay_amount: 70,
    memo: "メモ" + (i + 1),
    user_id: "userId1",
    company_id: "companyId" + [1, 2, 3, 1, 2, 3, 1, 2, 3, 1][i],
    created_at: new Date(),
    updated_at: new Date(),
  }));

export const getSelectedWorksMock = () =>
  Array.from({ length: 2 }, (_, i) => i + 1).map((_, i) => ({
    id: "workId" + (i + 1),
    date: new Date(thisYear, thisMonth, 1),
    starting_time: new Date(thisYear, thisMonth, 1, 8 + i * 4, 0),
    ending_time: new Date(thisYear, thisMonth, 1, 12 + i * 4, 0),
    break_time: 60,
    working_hours: 3.0,
    pay_amount: 4500,
    memo: "メモ" + (i + 1),
    user_id: "userId1",
    company_id: "companyId1",
    created_at: new Date(),
    updated_at: new Date(),
  }));

export const getWorksMSW = () => [
  rest.get("*/works", (_req, res, ctx) => {
    return res(ctx.json(getGetWorksMock()));
  }),
];
