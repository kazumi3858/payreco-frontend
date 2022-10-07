import { Company, ExchangeRate, Work } from "api/model";

export const findCurrencyRate = (
  work: Work,
  company: Company,
  exchangeRates: ExchangeRate[]
) => {
  const monthOfWork = new Date(work.date)
    .toISOString()
    .substring(0, 7)
    .replace("-", "");

  const selectedMonthRateData = exchangeRates.find(
    (data) => String(data.year_and_month) === monthOfWork
  );

  const rate = selectedMonthRateData
    ? selectedMonthRateData.exchange_rate_list
    : exchangeRates.slice(-1)[0].exchange_rate_list;

  const companyCurrencyRate: number = company
    ? Reflect.get(rate, company.currency_type)
    : 0;

  return companyCurrencyRate;
};
