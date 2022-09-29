import "@testing-library/jest-dom";
import CompanyForm from "components/organisms/CompanyForm";
import userEvent from "@testing-library/user-event";
import * as firebaseAuth from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCompaniesMock } from "api/companies/companies.msw";
import { Company } from "api/model";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const queryClient = new QueryClient();
const wageSystemCompany = getCompaniesMock()[0];

const companyForm = (company?: Company) => (
  <QueryClientProvider client={queryClient}>
    <CompanyForm setCompanyForm={jest.fn()} company={company} />
  </QueryClientProvider>
);

describe("CompanyForm", () => {
  it("can render posting form with empty inputs and default values", () => {
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

  it("can input values", async () => {
    const { getByLabelText } = render(companyForm());
    const inputName = getByLabelText(/名前/);
    const inputWage = getByLabelText(/時給額/);
    await userEvent.type(inputName, "株式会社abc");
    expect(inputName).toHaveValue("株式会社abc");
    await userEvent.type(inputWage, "15");
    expect(inputWage).toHaveValue(15);
  });

  it("can validate incorrect name", async () => {
    window.alert = jest.fn();
    const { getByLabelText } = render(companyForm());
    const inputName = getByLabelText(/名前/);
    const inputWage = getByLabelText(/時給額/);
    await userEvent.type(inputName, "あ".repeat(30));
    await userEvent.type(inputWage, "10");
    expect(screen.queryByText("名前は1～30文字にしてください。")).toBeNull();
    await userEvent.type(inputName, "あ".repeat(31));
    expect(
      screen.getByText("名前は1～30文字にしてください。")
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText(/保存/));
    expect(window.alert).toHaveBeenCalledWith([
      "名前は1～30文字にしてください。",
    ]);
  });

  it("can validate incorrect wage amount", async () => {
    window.alert = jest.fn();
    const { getByLabelText } = render(companyForm());
    const inputName = getByLabelText(/名前/);
    const inputWage = getByLabelText(/時給額/);
    await userEvent.type(inputName, "株式会社abc");
    await userEvent.type(inputWage, "99999");
    expect(
      screen.queryByText("時給額が不正な値・または大きすぎます。")
    ).toBeNull();
    await userEvent.type(inputWage, "100000");
    expect(
      screen.getByText("時給額が不正な値・または大きすぎます。")
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText(/保存/));
    expect(window.alert).toHaveBeenCalledWith([
      "時給額が不正な値・または大きすぎます。",
    ]);
  });
});
