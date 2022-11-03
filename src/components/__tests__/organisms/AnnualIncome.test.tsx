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
    expect(screen.getByText("6,000")).toBeInTheDocument();
    expect(screen.getByText("30,000")).toBeInTheDocument();
  });

  it("can render annual pay amount", () => {
    render(<AnnualIncome incomeList={incomeList} />);
    expect(screen.getByText("36,000")).toBeInTheDocument();
  });
});
