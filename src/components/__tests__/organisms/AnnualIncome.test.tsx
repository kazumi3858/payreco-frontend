import "@testing-library/jest-dom";
import AnnualIncome from "components/organisms/Annualncome";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";

type incomeListType = { [key: string]: [string, number][] };
const thisYear = format(new Date(), "yyyy");
const incomeList: incomeListType = {};

incomeList[thisYear + "08"] = [
  [thisYear + "-08-06", 3000],
  [thisYear + "-08-31", 3000],
];
incomeList[thisYear + "09"] = [
  [thisYear + "-09-01", 10000],
  [thisYear + "-09-10", 20000],
];

describe("AnnualIncome", () => {
  it("can render title properly", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("年間の給料")).toBeInTheDocument();
  });

  it("can render pay amount for months which have income", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("8月: 6,000円")).toBeInTheDocument();
    expect(screen.getByText("9月: 30,000円")).toBeInTheDocument();
    expect(screen.getAllByText(/ 0円/)).toHaveLength(10);
  });

  it("can render annual pay amount", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("合計: 36,000円")).toBeInTheDocument();
  });

  it("can render '0円' for each month and annual pay when there is no income at all", () => {
    render(<AnnualIncome incomeList={{}} />);
    expect(screen.getAllByText(/ 0円/)).toHaveLength(13);
  });
});
