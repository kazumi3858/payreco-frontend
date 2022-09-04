import RadioButton from "components/atoms/RadioButton";
import MonthlyIncome from "components/molecules/MonthlyIncome";
import AnnualIncome from "components/molecules/Annualncome";
import { useState } from "react";
import { Company, ExchangeRate, User, Work } from "api/model";
import Button from "components/atoms/Button";

type Props = {
  works?: Work[];
  companies?: Company[];
  exchangeRates?: ExchangeRate[];
};

function IncomeList({ works, companies, exchangeRates }: Props) {
  const [thisMonthMode, setThisMonthMode] = useState<boolean>(true);

  const changeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisMonthMode(Boolean(e.target.value));
  };

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

  const thisMonth = Number(
    new Date().getFullYear() + ("0" + (new Date().getMonth() + 1)).slice(-2)
  );
  console.log(thisMonth);
  const payAmountThisMonth =
    payAmountGroupByMonth && payAmountGroupByMonth[thisMonth];

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
              <MonthlyIncome income={payAmountThisMonth} />
              <div>
                目標金額:{" "}
                <input className="w-16" type="number" defaultValue="0" />円
                <Button text="更新" onClick={() => ""} />
              </div>
            </div>
          </div>
          <div
            className={
              thisMonthMode ? "hidden md:inline-block md:pl-14" : "md:pl-14"
            }
          >
            <AnnualIncome incomeList={payAmountGroupByMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
