import Heading from "components/atoms/Heading";

type Props = { incomeList?: { [key: string]: [string, number][] } };

function AnnualIncome({ incomeList }: Props) {
  const thisYear = new Date().getFullYear();
  const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsOfThisYear = numArray.map(
    (month) => thisYear + ("0" + month).slice(-2)
  );

  const incomeListByMonth = monthsOfThisYear.map(
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
    <div className="md:bg-white md:rounded-3xl md:pb-5 md:px-6">
      <Heading text="年間の給料" />
      {incomeList && isFinite(annualTotalIncome) ? (
        <>
          <ul>
            {incomeListByMonth.map((income, index) => (
              <li key={index} className="mb-2">
                {index + 1}月: {income.toLocaleString()}円
              </li>
            ))}
          </ul>
          <div className="text-right">
            <p className="mt-2 font-bold">
              合計: {annualTotalIncome.toLocaleString()}円
            </p>
          </div>
        </>
      ) : (
        <p>Laoding</p>
      )}
    </div>
  );
}

export default AnnualIncome;
