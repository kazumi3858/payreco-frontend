import "@testing-library/jest-dom";
import WorkForm from "components/organisms/WorkForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { getGetCompaniesMock } from "api/companies/companies.msw";
import { getGetWorksMock } from "api/works/works.msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Work } from "api/model";

const company = getGetCompaniesMock()[0];
const work = getGetWorksMock()[0];
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() - 1;
const queryClient = new QueryClient();

const workForm = (work?: Work) => (
  <QueryClientProvider client={queryClient}>
    <WorkForm
      selectedDay={new Date(thisYear, thisMonth, 1)}
      company={company}
      work={work}
      setWorkForm={jest.fn()}
    />
  </QueryClientProvider>
);

describe("WorkForm", () => {
  it("can render posting form properly", () => {
    const { getByLabelText } = render(workForm());
    expect(getByLabelText(/開始時刻/)).toHaveValue("2022-08-01T00:00");
    expect(getByLabelText(/終了時刻/)).toHaveValue("2022-08-01T00:00");
    expect(screen.getByText(/休憩/)).toBeInTheDocument();
    expect(screen.getByText(/0時間/)).toBeInTheDocument();
    expect(screen.getByText(/給料/)).toBeInTheDocument();
  });

  it("can render editing form with current saved values", () => {
    const { getByLabelText } = render(workForm(work));
    expect(screen.getByText(/株式会社abc/)).toBeInTheDocument();
    expect(screen.getByText(/7時間0分/)).toBeInTheDocument();
    expect(screen.getByText(/70/)).toBeInTheDocument();
    expect(getByLabelText(/メモ/)).toHaveValue("メモ1");
  });

  it("can show alert", async () => {
    window.alert = jest.fn();
    render(workForm());
    await userEvent.click(screen.getByText(/保存/));
    expect(window.alert).toHaveBeenCalledWith([
      "合計時間は正の数でなければなりません。",
    ]);
  });
});
