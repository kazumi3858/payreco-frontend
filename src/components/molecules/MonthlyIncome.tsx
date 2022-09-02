type Props = {
  income?: [[Date, number]];
};

function MonthlyIncome({ income }: Props) {
  const monthlyIncome = income?.reduce((sum, array) => sum + array[1], 0);
  return (
    <div>
      <p>今月の給料</p>
      <p>{monthlyIncome}円</p>
    </div>
  );
}

export default MonthlyIncome;
