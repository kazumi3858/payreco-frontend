import "@testing-library/jest-dom";
import IncomeList from "components/organisms/IncomeList";
import * as firebaseAuth from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getWorksMSW } from "api/works/works.msw";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const server = setupServer(...getWorksMSW());
const queryClient = new QueryClient();

const incomeList = (
  <QueryClientProvider client={queryClient}>
    <IncomeList />
  </QueryClientProvider>
);

describe("IncomeList", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("can render loading", () => {
    render(incomeList);
    expect(screen.getAllByText(/Loading/)).toBeTruthy();
  });

  it("can render monthly and annual contents", async () => {
    render(incomeList);
    expect(screen.getAllByText("今月の給料")).toBeTruthy();
    expect(screen.getAllByText("年間の給料")).toBeTruthy();
  });
});
