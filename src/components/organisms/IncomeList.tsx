import RadioButton from "components/atoms/RadioButton";
import MonthlyIncome from "components/molecules/MonthlyIncome";
import AnnualIncome from "components/molecules/Annualncome";
import TargetAmountForm from "./TagertAmountForm";
import Chart from "components/atoms/Chart";
import { useState } from "react";
import { useGetWorks } from "api/works/works";
import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { useGetUsersUserId } from "api/users/users";

function IncomeList() {
  const { data: user } = useGetUsersUserId();
  const { data: works, isLoading } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();

  const [thisMonthMode, setThisMonthMode] = useState<boolean>(true);

  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisMonthMode(Boolean(e.target.value));
  };

  const incomeListByMonth = works?.reduce((map, work) => {
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
    const convertedPayToJPY = Math.floor(work.pay_amount / rate);
    (map[year_and_month] = map[year_and_month] || []).push([
      work.date,
      convertedPayToJPY,
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
              checked={thisMonthMode}
            />
            <RadioButton
              type="big"
              value=""
              text="年間の給料"
              onChange={changeMode}
              checked={!thisMonthMode}
            />
          </div>
        </div>
        <div className="mb-10 md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className={!thisMonthMode ? "hidden md:inline-block" : ""}>
              <MonthlyIncome income={thisMonthIncome} loading={isLoading} />
              <Chart />
              {user && <TargetAmountForm user={user} />}
            </div>
          </div>
          <div
            className={
              thisMonthMode ? "hidden md:inline-block md:pl-14" : "md:pl-14"
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
