import RadioButton from "components/atoms/RadioButton";
import MonthlyIncome from "components/organisms/MonthlyIncome";
import AnnualIncome from "components/organisms/Annualncome";
import { useState } from "react";
import { useGetWorks } from "api/works/works";
import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { findCurrencyRate } from "utils/find-currency-rate";
import { format } from "date-fns";

function IncomeList() {
  const { data: works, isLoading } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();

  const [monthlyMode, setMonthlyMode] = useState(true);

  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyMode(Boolean(e.target.value));
  };

  const incomeListByMonth = works?.reduce((map, work) => {
    const monthOfWorks = String(work.date).substring(0, 7).replace("-", "");
    const company = companies?.find(
      (company): boolean => company.id === work.company_id
    )!;
    const rate = exchangeRates
      ? findCurrencyRate(work, company, exchangeRates)
      : 0;
    const payAmountWithJPY = Math.floor(work.pay_amount / rate);
    (map[monthOfWorks] = map[monthOfWorks] || []).push([
      String(work.date),
      payAmountWithJPY,
    ]);
    return map;
  }, {} as { [key: string]: [string, number][] });

  const thisMonth = format(new Date(), "yyyyMM");

  const incomeOfThisMonth = incomeListByMonth && incomeListByMonth[thisMonth];

  return (
    <div className="px-4 pt-5 pb-10">
      <div className="bg-white rounded-3xl px-6 pb-5 md:pb-0 md:px-0 md:bg-transparent max-w-lg mx-auto md:max-w-7xl">
        <div className="flex justify-center">
          <div className="md:hidden space-x-5 my-3">
            <RadioButton
              type="big"
              value="true"
              text="今月の給料"
              onChange={changeMode}
              checked={monthlyMode}
            />
            <RadioButton
              type="big"
              value=""
              text="年間の給料"
              onChange={changeMode}
              checked={!monthlyMode}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2">
          <div className={!monthlyMode ? "hidden md:inline-block" : ""}>
            <MonthlyIncome income={incomeOfThisMonth} isLoading={isLoading} />
          </div>
          <div
            className={
              monthlyMode ? "hidden md:inline-block md:pl-14" : "mb-8 md:pl-14"
            }
          >
            <AnnualIncome incomeList={incomeListByMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
