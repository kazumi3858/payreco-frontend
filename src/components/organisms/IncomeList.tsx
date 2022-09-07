import RadioButton from "components/atoms/RadioButton";
import MonthlyIncome from "components/molecules/MonthlyIncome";
import AnnualIncome from "components/molecules/Annualncome";
import { useState } from "react";
import { useGetWorks } from "api/works/works";
import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { useGetUsersUserId } from "api/users/users";
import { usePatchUsersUserId } from "api/default/default";
import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";

function IncomeList() {
  const { data: works, isLoading } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();
  const { data: user } = useGetUsersUserId();

  const defaultTargetAmount = user?.target_amount ? user.target_amount : 0;
  const [targetAmount, setTargetAmount] = useState<number>(defaultTargetAmount);
  const [thisMonthMode, setThisMonthMode] = useState<boolean>(true);
  const [updateData, setUpdateData] = useState<boolean>(false);

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
  const payAmountThisMonth =
    payAmountGroupByMonth && payAmountGroupByMonth[thisMonth];

  const queryClient = useQueryClient();
  const mutation = usePatchUsersUserId();
  const mutationResult = customMutationResult(
    queryClient,
    `/user`,
    setUpdateData
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateData(true);

    if (targetAmount > 9999999 || targetAmount <= 0) {
      setUpdateData(false);
      return alert("目標金額が不正な値・または大きすぎます。");
    }

    mutation.mutate(
      { data: { target_amount: targetAmount !== 0 ? targetAmount : null } },
      mutationResult
    );
  };

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
              <MonthlyIncome income={payAmountThisMonth} loading={isLoading} />
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    毎月の目標金額:{" "}
                    <input
                      className="w-20 bg-stone-100"
                      type="number"
                      defaultValue={
                        defaultTargetAmount ? defaultTargetAmount : ""
                      }
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                    />
                    円
                  </label>
                  <input
                    className="m-1 cursor-pointer bg-stone-200 p-1 rounded-md"
                    type="submit"
                    value={updateData ? "更新中..." : "設定"}
                  />
                </form>
                {!user?.target_amount && (
                  <p className="text-xs">
                    ※目標金額を設定すると現時点での達成率が確認できるようになります。
                  </p>
                )}

                {targetAmount != null &&
                  (targetAmount > 9999999 || targetAmount < 0) && (
                    <p className="text-rose-600">
                      目標金額が不正な値・または大きすぎます。
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div
            className={
              thisMonthMode ? "hidden md:inline-block md:pl-14" : "md:pl-14"
            }
          >
            <AnnualIncome
              incomeList={payAmountGroupByMonth}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeList;
