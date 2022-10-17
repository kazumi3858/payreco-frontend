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
  const { data: works } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();

  const [isMonthlyMode, setIsMonthlyMode] = useState(true);

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
      <div className="mx-auto max-w-lg rounded-xl border border-stone-200 bg-white px-6 pb-3 md:max-w-7xl md:border-0 md:bg-transparent md:px-0 md:pb-0">
        <div className="flex justify-center">
          <div className="my-3 md:hidden">
            <RadioButton
              value="true"
              text="今月の給料"
              onChange={(e) => setIsMonthlyMode(Boolean(e.target.value))}
              isChecked={isMonthlyMode}
              shape="rounded-l-full"
              padding="py-2 px-4"
            />
            <RadioButton
              value=""
              text="年間の給料"
              onChange={(e) => setIsMonthlyMode(Boolean(e.target.value))}
              isChecked={!isMonthlyMode}
              shape="rounded-r-full"
              padding="py-2 px-4"
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2">
          <div className={!isMonthlyMode ? "hidden md:inline-block" : ""}>
            <MonthlyIncome income={incomeOfThisMonth} />
          </div>
          <div
            className={
              isMonthlyMode ? "hidden md:inline-block md:pl-14" : "md:pl-14"
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
