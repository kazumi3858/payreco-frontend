import RadioButton from "components/atoms/RadioButton";
import MonthlyIncome from "components/molecules/MonthlyIncome";
import AnnualIncome from "components/molecules/Annualncome";
import { useState } from "react";
import { useGetWorks } from "api/works/works";
import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { findCurrencyRate } from "utils/find-currency-rate";

function IncomeList() {
  const { data: works, isLoading } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();

  const [monthlyMode, setMonthlyMode] = useState<boolean>(true);

  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyMode(Boolean(e.target.value));
  };

  const incomeListByMonth = works?.reduce((map, work) => {
    const monthOfWorks = String(work.date).substring(0, 7).replace("-", "");
    const company = companies?.find(
      (company): boolean => company.id === work.company_id
    )!;
    const rate = findCurrencyRate(work, company, exchangeRates!);

    const payAmountWithJPY = Math.floor(work.pay_amount / rate);
    (map[monthOfWorks] = map[monthOfWorks] || []).push([
      work.date,
      payAmountWithJPY,
    ]);
    return map;
  }, {} as { [key: string]: [[Date, number]] });

  const thisMonth = Number(
    new Date().getFullYear() + ("0" + (new Date().getMonth() + 1)).slice(-2)
  );
  const thisMonthIncome = incomeListByMonth && incomeListByMonth[thisMonth];

  return (
    <div className="pt-5">
      <div className="max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
        <div className="flex justify-center">
          <div className="md:hidden space-x-6 mb-6">
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
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className={!monthlyMode ? "hidden md:inline-block" : ""}>
              <MonthlyIncome income={thisMonthIncome} loading={isLoading} />
            </div>
          </div>
          <div
            className={
              monthlyMode ? "hidden md:inline-block md:pl-14" : "mb-8 md:pl-14"
            }
          >
            <AnnualIncome incomeList={incomeListByMonth} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
