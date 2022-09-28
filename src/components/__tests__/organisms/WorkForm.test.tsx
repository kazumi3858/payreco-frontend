import "@testing-library/jest-dom";
import WorkForm from "components/organisms/WorkForm";
import userEvent from "@testing-library/user-event";
import * as firebaseAuth from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { getCompaniesMock } from "api/companies/companies.msw";
import { getGetWorksMock, getIncorrectTimeWork } from "api/works/works.msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Company, Work } from "api/model";
import { format } from "date-fns";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const wageSystemCompany = getCompaniesMock()[0];
const nonWageSystemCompany = getCompaniesMock()[1];
const work = getGetWorksMock()[0];
const thisMonthFirstDay = format(new Date(), "yyyy-MM-01");
const queryClient = new QueryClient();

const workForm = (company: Company, work?: Work) => (
  <QueryClientProvider client={queryClient}>
    <WorkForm
      selectedDay={new Date(thisMonthFirstDay)}
      company={company}
      work={work}
      setWorkForm={jest.fn()}
    />
  </QueryClientProvider>
);

describe("WorkForm", () => {
  it("can render posting form properly", () => {
    const { getByLabelText } = render(workForm(wageSystemCompany));
    expect(getByLabelText("開始時刻")).toHaveValue(
      `${thisMonthFirstDay}T00:00`
    );
    expect(getByLabelText("終了時刻")).toHaveValue(
      `${thisMonthFirstDay}T00:00`
    );
    expect(screen.getByText("休憩")).toBeInTheDocument();
    expect(screen.getByText(/0時間/)).toBeInTheDocument();
    expect(screen.getByText("給料")).toBeInTheDocument();
  });

  it("can render editing form with current saved values", () => {
    const { getByLabelText } = render(workForm(wageSystemCompany, work));
    expect(screen.getByText("株式会社abc")).toBeInTheDocument();
    expect(screen.getByText("7時間0分")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(getByLabelText("メモ")).toHaveValue("メモです");
  });

  it("can validate incorrect pay amount", async () => {
    window.alert = jest.fn();
    const { getByLabelText } = render(workForm(nonWageSystemCompany, work));
    const inputPay = getByLabelText("給料");
    await userEvent.type(inputPay, "999999");
    expect(
      screen.queryByText("金額が不正な値・または大きすぎます。")
    ).toBeNull();
    await userEvent.type(inputPay, "1000000");
    expect(
      screen.getByText("金額が不正な値・または大きすぎます。")
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText("保存"));
    expect(window.alert).toHaveBeenCalledWith([
      "金額が不正な値・または大きすぎます。",
    ]);
  });

  it("can validate incorrect memo", async () => {
    window.alert = jest.fn();
    const { getByLabelText } = render(workForm(wageSystemCompany, work));
    const inputWage = getByLabelText("メモ");
    await userEvent.type(inputWage, "あ".repeat(50));
    expect(screen.queryByText("メモは50文字以内に収めてください。")).toBeNull();
    await userEvent.type(inputWage, "あ".repeat(51));
    expect(
      screen.getByText("メモは50文字以内に収めてください。")
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText("保存"));
    expect(window.alert).toHaveBeenCalledWith([
      "メモは50文字以内に収めてください。",
    ]);
  });

  it("can validate incorrect working hours", async () => {
    window.alert = jest.fn();
    render(workForm(wageSystemCompany, getIncorrectTimeWork));
    expect(
      screen.getByText("合計時間が正しくありません。")
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText("保存"));
    expect(window.alert).toHaveBeenCalledWith(["合計時間が正しくありません。"]);
  });
});
