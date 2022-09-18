import "@testing-library/jest-dom";
import IncomeList from "components/organisms/IncomeList";
import { render, screen } from "@testing-library/react";
import * as ReactQuery from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );
  return { ...original, useQuery: () => ({}) };
});

describe("IncomeList", () => {
  it("can call click event", () => {
    render(<IncomeList />);
    expect(screen.getAllByText("今月の給料")).toBeTruthy();
    expect(screen.getAllByText("年間の給料")).toBeTruthy();
  });
});
