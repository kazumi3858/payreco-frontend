import RadioButton from "components/atoms/RadioButton";
import MonthlyIncome from "components/molecules/MonthlyIncome";
import AnnualIncome from "components/molecules/Annualncome";
import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { useGetWorks } from "api/works/works";
import { useState } from "react";

function IncomeList() {
  const [incomeData, setIncomeData] = useState<string>("monthly");
  const { data: works } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();

  const payAmountGroupByMonth = works?.reduce((map, work) => {
    const year_and_month = String(work.date).substring(0, 7).replace("-", "");
    const company = companies?.find(
      (company) => company.id === work.company_id
    );
    const rateData = exchangeRates?.find(
      (data) => String(data.year_and_month) === year_and_month
    );
    const rateList = rateData
      ? rateData.exchange_rate_list
      : exchangeRates?.slice(-1)[0].exchange_rate_list;
    const rate =
      rateList &&
      company?.currency_type &&
      Reflect.get(rateList, company.currency_type);
    const payAmountWithJPY = Math.floor(work.pay_amount / rate);
    (map[year_and_month] = map[year_and_month] || []).push([
      work.date,
      payAmountWithJPY,
    ]);
    return map;
  }, {} as { [key: string]: [[Date, number]] });

  const payAmountThisMonth =
    payAmountGroupByMonth && payAmountGroupByMonth[202209];

  return (
    <div className="pt-5">
      <div className="max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
        <div className="flex justify-center">
          <div>
            <RadioButton
              value="monthly"
              text="今月の給料"
              onChange={() => setIncomeData("monthly")}
              checked={incomeData === "monthly"}
            />
            <RadioButton
              value="annual"
              text="年間の給料"
              onChange={() => setIncomeData("annual")}
              checked={incomeData === "annual"}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <MonthlyIncome income={payAmountThisMonth} />
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:pl-14">
            <AnnualIncome incomeList={payAmountGroupByMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
