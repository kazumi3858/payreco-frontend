import "@testing-library/jest-dom";
import WorkList from "components/organisms/WorkList";
import { render, screen } from "@testing-library/react";
import { getSelectedWorksMock } from "api/works/works.msw";
import { getCompaniesMSW } from "api/companies/companies.msw";
import { Work } from "api/model";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as firebaseAuth from "firebase/auth";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const server = setupServer(...getCompaniesMSW());
const works = getSelectedWorksMock();
const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();
const queryClient = new QueryClient();

const workList = (works?: Work[]) => (
  <QueryClientProvider client={queryClient}>
    <WorkList
      selectedDay={new Date(thisYear, thisMonth, 1)}
      selectedDayWorks={works}
    />
  </QueryClientProvider>
);

describe("WorkList", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("can render loading", async () => {
    render(workList(works));
    expect(screen.getAllByText(/Loading/)).toBeTruthy();
  });

  it("can render work list in selected day", async () => {
    render(workList(works));
    expect(await screen.findAllByText(/株式会社山田/)).toHaveLength(3);
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
