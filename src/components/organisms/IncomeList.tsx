import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { Company } from "api/model";
import { Work } from "api/model/work";
import { useGetWorks } from "api/works/works";
import RadioButton from "components/atoms/RadioButton";
import { useState } from "react";

function IncomeList() {
  const [incomeData, setIncomeData] = useState<string>("monthly");
  const { data: works } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();

  const groupBy = <T extends { [key: string]: any }>(
    works: T[],
    key: keyof T
  ): { [key: string]: number[] } =>
    works.reduce((map, work) => {
      const company = companies?.find(
        (company) => company.id === work.company_id
      );
      const rateData = exchangeRates?.find(
        (data) =>
          String(data.year_and_month) ===
          work.date.substring(0, 7).replace("-", "")
      );
      const rateList = rateData
        ? rateData.exchange_rate_list
        : exchangeRates?.slice(-1)[0].exchange_rate_list;
      const rate =
        rateList &&
        company?.currency_type &&
        Reflect.get(rateList, company.currency_type);
      const payAmountWithJPY = Math.floor(work.pay_amount / rate);
      (map[work[key].substring(0, 7)] =
        map[work[key].substring(0, 7)] || []).push(payAmountWithJPY);
      return map;
    }, {} as { [key: string]: number[] });

  const payAmountGroupByMonth = works && groupBy(works, "date");

  console.log(payAmountGroupByMonth);
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
              <p>今月の給料</p>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:pl-14">
            <p>年間の給料</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
