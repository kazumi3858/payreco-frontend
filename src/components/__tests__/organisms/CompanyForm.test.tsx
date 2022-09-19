import "@testing-library/jest-dom";
import CompanyForm from "components/organisms/CompanyForm";
import { render, screen } from "@testing-library/react";
import { useState as useStateMock } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getGetCompaniesMock } from "api/companies/companies.msw";
import { Company } from "api/model";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.mock("api/default/default");

describe("CompanyForm", () => {
  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [
      init,
      setMockState,
    ]);
  });

  const setMockState = jest.fn();
  const queryClient = new QueryClient();
  const wageSystemCompany = getGetCompaniesMock()[0];
  const nonWageSystemCompany = getGetCompaniesMock()[1];

  const companyForm = (company?: Company) => (
    <QueryClientProvider client={queryClient}>
      <CompanyForm setCompanyForm={setMockState(true)} company={company} />
    </QueryClientProvider>
  );

  it("can render posting form with empty inputs and default selected values", () => {
    const { getByLabelText } = render(companyForm());
    const selectedCurrency = screen.getByRole("combobox") as HTMLSelectElement;
    expect(getByLabelText(/名前/)).toHaveValue("");
    expect(getByLabelText(/時給制/)).toBeChecked();
    expect(getByLabelText(/時給額/)).toHaveValue(null);
    expect(selectedCurrency.value).toBe("円");
  });

  it("can render editing form with current saved values", () => {
    const { getByLabelText } = render(companyForm(wageSystemCompany));
    const selectedCurrency = screen.getByRole("combobox") as HTMLSelectElement;
    expect(getByLabelText(/名前/)).toHaveValue(wageSystemCompany.name);
    expect(getByLabelText(/時給制/)).toBeChecked();
    expect(screen.getByLabelText(/時給額/)).toHaveValue(
      wageSystemCompany.wage_amount
    );
    expect(selectedCurrency.value).toBe(wageSystemCompany.currency_type);
  });

  it("should not show wage amount input when hourly wage system is false", () => {
    const { getByLabelText } = render(companyForm(nonWageSystemCompany));
    expect(getByLabelText(/日給制/)).toBeChecked();
    expect(screen.queryByLabelText(/時給額/)).toBeNull();
  });

  it("can input values", async () => {
    const { getByLabelText } = render(companyForm());
    const inputName = getByLabelText(/名前/);
    const inputWage = getByLabelText(/時給額/);
    await userEvent.type(inputName, "株式会社abc");
    expect(inputName).toHaveValue("株式会社abc");
    await userEvent.type(inputWage, "15");
    expect(inputWage).toHaveValue(15);
  });

  it("can show alert", async () => {
    window.alert = jest.fn();
    render(companyForm());
    await userEvent.click(screen.getByText(/保存/));
    expect(window.alert).toHaveBeenCalledWith([
      "名前は1～30文字にしてください。",
      "時給額が不正な値・または大きすぎます。",
    ]);
  });
});
