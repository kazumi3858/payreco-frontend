import Heading from "components/atoms/Heading";

type Props = {
  incomeList?: { [key: string]: [[Date, number]] };
};

function AnnualIncome({ incomeList }: Props) {
  const thisYear = new Date().getFullYear();
  const numArray = Array(12)
    .fill(0)
    .map((_, i) => i + 1);
  const thisYearMonths = numArray.map((month) =>
    Number(thisYear + ("0" + month).slice(-2))
  );

  const incomeListByMonth = thisYearMonths.map(
    (month) =>
      (incomeList &&
        incomeList[month] &&
        incomeList[month].reduce((sum, array) => sum + array[1], 0)) ||
      0
  );

  const annualTotalIncome = incomeListByMonth.reduce(
    (sum, array) => sum + array,
    0
  );

  return (
    <div>
      <Heading text="年間の給料" />
      {incomeList && isFinite(annualTotalIncome) ? (
        <>
          <ul>
            {incomeListByMonth.map((income, idx) => (
              <li key={idx} className="mb-2">
                {idx + 1}月: {income.toLocaleString()}円
              </li>
            ))}
          </ul>
          <p className="mt-10">合計: {annualTotalIncome.toLocaleString()}円</p>
        </>
      ) : (
        <p>Laoding</p>
      )}
    </div>
  );
}

export default AnnualIncome;
