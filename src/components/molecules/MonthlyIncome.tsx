import Heading from "components/atoms/Heading";
import { isPast, parseISO } from "date-fns";

type Props = {
  income?: [[Date, number]];
  loading: boolean;
};

function MonthlyIncome({ income, loading }: Props) {
  const totalIncome = income?.reduce((sum, array) => sum + array[1], 0) || 0;
  const workedDaysData = income?.filter((data) =>
    isPast(parseISO(String(data[0])))
  );
  const earnedIncome =
    workedDaysData?.reduce((sum, array) => sum + array[1], 0) || 0;
  const expectedIncome = totalIncome - earnedIncome;
  return (
    <>
      <Heading text="今月の給料" />
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <ul>
            <li className="mb-2">現在: {earnedIncome.toLocaleString()}円</li>
            <li className="mb-2">
              見込み: {expectedIncome.toLocaleString()}円
            </li>
            <li className="mb-2">合計: {totalIncome.toLocaleString()}円</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default MonthlyIncome;
