import "@testing-library/jest-dom";
import * as firebaseAuth from "firebase/auth";
import MonthlyIncome from "components/organisms/MonthlyIncome";
import { render, screen } from "@testing-library/react";
import { format, getDate } from "date-fns";
import { getUsersMSW } from "api/users/users.msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const server = setupServer(...getUsersMSW());
const queryClient = new QueryClient();

const thisMonth = format(new Date(), "yyyy-MM-");
const income: [string, number][] = [
  [thisMonth + "01", 1000],
  [thisMonth + "10", 2000],
];

describe("MonthlyIncome", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("can render correct income", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MonthlyIncome income={income} />
      </QueryClientProvider>
    );

    if (getDate(new Date()) >= 10) {
      expect(await screen.findAllByText(/3,000/)).toHaveLength(2);
    } else {
      expect(await screen.findByText(/1,000/)).toBeInTheDocument();
      expect(screen.getByText(/2,000/)).toBeInTheDocument();
      expect(screen.getByText(/3,000/)).toBeInTheDocument();
    }
  });
});
