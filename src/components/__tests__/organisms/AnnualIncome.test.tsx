import "@testing-library/jest-dom";
import AnnualIncome from "components/organisms/Annualncome";
import { render, screen } from "@testing-library/react";

describe("AnnualIncome", () => {
  type incomeListType = { [key: string]: [[Date, number]] };
  const thisYear = new Date().getFullYear();
  const incomeList: incomeListType = {};
  incomeList[thisYear + "08"] = [[new Date(thisYear, 8, 31), 10000]];
  incomeList[thisYear + "09"] = [[new Date(thisYear, 9, 1), 20000]];

  it("can render title properly", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("年間の給料")).toBeInTheDocument();
  });

  it("can render pay amount for months which have income", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("8月: 10,000円")).toBeInTheDocument();
    expect(screen.getByText("9月: 20,000円")).toBeInTheDocument();
    expect(screen.getAllByText(/ 0円/)).toHaveLength(10);
  });

  it("can render annual pay amount", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("合計: 30,000円")).toBeInTheDocument();
  });

  it("can render '0円' for each month and annual pay when there is no income at all", () => {
    render(<AnnualIncome incomeList={{}} />);
    expect(screen.getAllByText(/ 0円/)).toHaveLength(13);
  });
});
