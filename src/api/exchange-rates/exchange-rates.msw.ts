/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { rest } from "msw";
import { format, subMonths } from "date-fns";

const thisMonth = format(new Date(), "yyyyMM");
const lastMonth = format(subMonths(new Date(), 1), "yyyyMM");

export const getExchangeRatesMock = () =>
  Array.from({ length: 2 }, (_, i) => i + 1).map((_, i) => ({
    id: i,
    year_and_month: Number([thisMonth, lastMonth][i]),
    exchange_rate_list: {
      円: 1,
      米ドル: i == 0 ? 0.007416 : 0.007589,
      ユーロ: 0.007282,
      英ポンド: 0.006149,
      インドルピー: 0.5887,
      豪ドル: 0.01075,
      カナダドル: 0.009609,
      ランド: 0.124,
      NZドル: 0.01187,
      SGドル: 0.01022,
      人民元: 0.05024,
      スイスフラン: 0.007126,
    },
    created_at: new Date(),
    updated_at: new Date(),
  }));

export const getExchangeRatesMSW = () => [
  rest.get("*/exchange_rates", (_req, res, ctx) => {
    return res(ctx.json(getExchangeRatesMock()));
  }),
];
