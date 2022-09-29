import "@testing-library/jest-dom";
import WorkDetails from "components/organisms/WorkDetails";
import * as firebaseAuth from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { getGetWorksMock } from "api/works/works.msw";
import { getCompaniesMock } from "api/companies/companies.msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getExchangeRatesMSW } from "api/exchange-rates/exchange-rates.msw";
import { setupServer } from "msw/node";
import { Work } from "api/model";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const server = setupServer(...getExchangeRatesMSW());
const work = getGetWorksMock()[0];
const company = getCompaniesMock()[0];
const queryClient = new QueryClient();

const workDetails = (work: Work) => (
  <QueryClientProvider client={queryClient}>
    <WorkDetails work={work} selectedDay={new Date()} company={company} />
  </QueryClientProvider>
);

describe("WorkDetails", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("can render work details properly", () => {
    render(workDetails(work));
    expect(screen.getByText("8:00 AM - 4:00 PM")).toBeInTheDocument();
    expect(screen.getByText("株式会社abc")).toBeInTheDocument();
    expect(screen.getByText(/1時間/)).toBeInTheDocument();
    expect(screen.getByText(/7時間/)).toBeInTheDocument();
    expect(screen.getByText(/70米ドル/)).toBeInTheDocument();
    expect(screen.getByText("メモです")).toBeInTheDocument();
  });

  it("can render japanese yen calclated by exchange rates properly", async () => {
    render(workDetails(work));
    expect(await screen.findByText(/(9439円)/)).toBeInTheDocument();
  });
});
