import "@testing-library/jest-dom";
import CompanyForm from "components/organisms/CompanyForm";
import { render, screen } from "@testing-library/react";
import { useState as useStateMock } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getGetCompaniesMock } from "api/companies/companies.msw";
import { Company } from "api/model";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.mock("api/default/default");

describe("CompanyForm", () => {
  beforeEach(() =>
    (useStateMock as jest.Mock).mockImplementation((init) => [
      init,
      setMockState,
    ])
  );

  const setMockState = jest.fn();
  const queryClient = new QueryClient();
  const company = getGetCompaniesMock()[0];
  const companyForm = (company?: Company) => (
    <QueryClientProvider client={queryClient}>
      <CompanyForm setCompanyForm={setMockState(true)} company={company} />
    </QueryClientProvider>
  );

  it("can render labels for form", () => {
    render(companyForm(company));
    expect(screen.getByText(/名前/)).toBeInTheDocument();
    expect(screen.getByText(/時給制/)).toBeInTheDocument();
    expect(screen.getByText(/通貨/)).toBeInTheDocument();
  });

  it("can render empty inputs for posting", () => {
    render(companyForm());
    expect(screen.getByLabelText(/名前/)).toHaveValue("");
    expect(screen.getByLabelText(/時給額/)).toHaveValue(null);
  });

  it("can render inputs with values for editing", () => {
    render(companyForm(company));
    const selectedOption = screen.getByRole("combobox") as HTMLSelectElement;
    expect(screen.getByLabelText(/名前/)).toHaveValue(company.name);
    company.hourly_wage_system &&
      expect(screen.getByLabelText(/時給額/)).toHaveValue(company.wage_amount);
    expect(selectedOption.value).toBe(company.currency_type);
  });
});
