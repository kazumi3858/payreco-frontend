import "@testing-library/jest-dom";
import MonthlyIncome from "components/organisms/MonthlyIncome";
import * as ReactQuery from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { format, getDate } from "date-fns";

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );
  return { ...original, useQuery: () => ({}) };
});

const thisMonth = format(new Date(), "yyyy-MM-");
const income: [string, number][] = [
  [thisMonth + "01", 1000],
  [thisMonth + "10", 2000],
];

describe("MonthlyIncome", () => {
  it("can render correct income", () => {
    render(<MonthlyIncome income={income} isLoading={false} />);

    if (getDate(new Date()) >= 10) {
      expect(screen.getByText("本日まで: 3,000円")).toBeInTheDocument();
    } else {
      expect(screen.getByText("本日まで: 1,000円")).toBeInTheDocument();
      expect(screen.getByText("見込み: 2,000円")).toBeInTheDocument();
    }
    expect(screen.getByText("合計: 3,000円")).toBeInTheDocument();
  });

  it("can render loading", () => {
    render(<MonthlyIncome income={[]} isLoading={true} />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
