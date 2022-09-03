import { isPast, parseISO } from "date-fns";

type Props = {
  income?: [[Date, number]];
};

function MonthlyIncome({ income }: Props) {
  const totalIncome = income?.reduce((sum, array) => sum + array[1], 0) || 0;
  const workedDaysData = income?.filter((data) =>
    isPast(parseISO(String(data[0])))
  );
  const earnedIncome =
    workedDaysData?.reduce((sum, array) => sum + array[1], 0) || 0;
  const expectedIncome = totalIncome - earnedIncome;

  return (
    <div>
      <p>今月の給料</p>
      <p>現在: {earnedIncome.toLocaleString()}円</p>
      <p>見込み: {expectedIncome.toLocaleString()}円</p>
      <p>合計: {totalIncome.toLocaleString()}円</p>
    </div>
  );
}

export default MonthlyIncome;
