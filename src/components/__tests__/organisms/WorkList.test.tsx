import "@testing-library/jest-dom";
import WorkList from "components/organisms/WorkList";
import * as ReactQuery from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { getSelectedWorksMock } from "api/works/works.msw";
import { getCompanyMock } from "api/companies/companies.msw";
import { Work } from "api/model";

const works = getSelectedWorksMock();
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );
  return {
    ...original,
    useQuery: () => ({
      isLoading: false,
      data: getCompanyMock,
    }),
  };
});

const workList = (works?: Work[]) => (
  <WorkList
    selectedDay={new Date(thisYear, thisMonth, 1)}
    selectedDayWorks={works}
  />
);

describe("WorkList", () => {
  it("can render work list in selected day", () => {
    render(workList(works));
    expect(screen.getAllByText("株式会社山田")).toHaveLength(3);
    expect(screen.getByText(/8:00 AM - 12:00 PM/)).toBeInTheDocument();
    expect(screen.getByText(/12:00 PM - 4:00 PM/)).toBeInTheDocument();
  });

  it("can render work list ordered by starting time", () => {
    render(workList(works));
    const elements = screen.getAllByText(/M - /);
    expect(elements[0]).toHaveTextContent(/8:00 AM - 12:00 PM/);
    expect(elements[1]).toHaveTextContent(/12:00 PM - 4:00 PM/);
  });

  it("cannot render data if selected day does not have works", () => {
    render(workList());
    expect(screen.queryByText(/合計勤務/)).toBeNull();
    expect(screen.getByText("予定はありません。")).toBeInTheDocument();
  });
});
