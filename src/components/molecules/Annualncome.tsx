type Props = {
  incomeList?: { [key: string]: [[Date, number]] };
};

function AnnualIncome({ incomeList }: Props) {
  const year = new Date().getFullYear();
  const months = Array(12)
    .fill(0)
    .map((_, i) => i + 1);
  const yearAndMonths = months.map((month) =>
    Number(year + ("0" + month).slice(-2))
  );

  const incomeListByMonth = yearAndMonths.map(
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
      <p>年間の給料</p>
      <ul>
        {incomeListByMonth.map((income, idx) => (
          <li key={idx}>
            {idx + 1}月: {income.toLocaleString()}円
          </li>
        ))}
      </ul>
      <p className="mt-10">合計: {annualTotalIncome.toLocaleString()}円</p>
    </div>
  );
}

export default AnnualIncome;
