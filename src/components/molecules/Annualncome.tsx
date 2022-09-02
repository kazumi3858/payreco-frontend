type Props = {
  incomeList?: { [key: string]: [[Date, number]] };
};

function AnnualIncome({ incomeList }: Props) {
  return (
    <div>
      <p>年間の給料</p>
    </div>
  );
}

export default AnnualIncome;
