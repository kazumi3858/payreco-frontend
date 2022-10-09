import "@testing-library/jest-dom";
import Calendar from "components/organisms/Calendar";
import * as firebaseAuth from "firebase/auth";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { setupServer } from "msw/node";
import { getWorksMSW } from "api/works/works.msw";
import { getCompaniesMSW } from "api/companies/companies.msw";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const thisMonth = format(new Date(), "yyyy年 MMMM", { locale: ja });
const handlers = [...getWorksMSW(), ...getCompaniesMSW()];
const server = setupServer(...handlers);
const queryClient = new QueryClient();

describe("Calendar", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("can render this month calendar", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Calendar />
      </QueryClientProvider>
    );
    expect(screen.getByText(thisMonth)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Loading")).toBeNull());
    expect(await screen.findAllByText(/●/)).toHaveLength(10);
  });
});
