import { Company, ExchangeRate, Work } from "api/model";

export const findCurrencyRate = (
  work: Work,
  company: Company,
  exchangeRates: ExchangeRate[]
) => {
  const monthOfWorks = String(work.date).substring(0, 7).replace("-", "");

  const selectedMonthRateData = exchangeRates.find(
    (data) => String(data.year_and_month) === monthOfWorks
  );

  const rate = selectedMonthRateData
    ? selectedMonthRateData.exchange_rate_list
    : exchangeRates.slice(-1)[0].exchange_rate_list;

  const companyCurrencyRate: number =
    rate && company.currency_type && Reflect.get(rate, company.currency_type);

  return companyCurrencyRate;
};
