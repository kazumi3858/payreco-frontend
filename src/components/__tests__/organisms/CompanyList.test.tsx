import "@testing-library/jest-dom";
import CompanyList from "components/organisms/CompanyList";
import * as ReactQuery from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { getGetCompaniesMock } from "api/companies/companies.msw";

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );
  return {
    ...original,
    useQuery: () => ({
      isLoading: false,
      data: getGetCompaniesMock(),
    }),
  };
});

describe("CompanyList", () => {
  it("can render company list", async () => {
    render(<CompanyList />);
    expect(screen.getAllByText(/株式会社/)).toBeTruthy();
    expect(screen.getAllByText(/[時日]給/)).toBeTruthy();
  });
});
