import "@testing-library/jest-dom";
import AnnualIncome from "components/organisms/Annualncome";
import { fireEvent, render, screen } from "@testing-library/react";

describe("AnnualIncome", () => {
  type incomeType = { [key: string]: [[Date, number]] };
  const incomeList: incomeType = {
    "202208": [[new Date(2022, 8, 20), 10000]],
    "202209": [[new Date(2022, 9, 10), 20000]],
  };
  it("can render title properly", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("年間の給料")).toBeInTheDocument();
  });

  it("can render pay amount for specific month", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("8月: 10,000円")).toBeInTheDocument();
  });

  it("can render total pay amount for this year", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("合計: 30,000円")).toBeInTheDocument();
  });
});
