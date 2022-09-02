import { endOfToday, isPast, isToday, parseISO } from "date-fns";

type Props = {
  income?: [[Date, number]];
};

function MonthlyIncome({ income }: Props) {
  const thisMonthTotalIncome =
    income?.reduce((sum, array) => sum + array[1], 0) || 0;
  const workedDaysData = income?.filter((data) =>
    isPast(parseISO(String(data[0])))
  );
  const thisMonthPastIncome =
    workedDaysData?.reduce((sum, array) => sum + array[1], 0) || 0;
  const thisMonthFutureIncome = thisMonthTotalIncome - thisMonthPastIncome;

  return (
    <div>
      <p>今月の給料</p>
      <p>現在: {thisMonthPastIncome.toLocaleString()}円</p>
      <p>見込み: {thisMonthFutureIncome.toLocaleString()}円</p>
      <p>合計: {thisMonthTotalIncome.toLocaleString()}円</p>
    </div>
  );
}

export default MonthlyIncome;
