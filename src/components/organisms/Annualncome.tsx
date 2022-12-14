import Heading from "components/atoms/Heading";
import LoadingIcon from "components/atoms/LoadingIcon";
import PayAmount from "components/atoms/PayAmount";

type Props = { incomeList?: { [key: string]: [string, number][] } };

function AnnualIncome({ incomeList }: Props) {
  const thisYear = new Date().getFullYear();
  const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsOfThisYear = monthNumbers.map(
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
    <div className="md:rounded-xl md:border md:border-stone-300 md:bg-white md:px-6 md:pb-2">
      <div className="hidden md:block">
        <Heading text="年間の給料" />
      </div>
      {incomeList && isFinite(annualTotalIncome) ? (
        <div className="mt-4">
          <ul>
            {incomeListByMonth.map((income, index) => (
              <li key={index} className="mb-3 text-sm">
                <span className="mr-3 inline-block w-9 text-right font-bold">
                  {index + 1}月
                </span>
                <span>{income.toLocaleString()}</span>
                <span className="ml-1">円</span>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <PayAmount text="年間合計" amount={annualTotalIncome} />
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}

export default AnnualIncome;
