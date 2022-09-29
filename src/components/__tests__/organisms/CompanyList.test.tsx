import "@testing-library/jest-dom";
import CompanyList from "components/organisms/CompanyList";
import * as firebaseAuth from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { getCompaniesMSW } from "api/companies/companies.msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const server = setupServer(...getCompaniesMSW());
const queryClient = new QueryClient();

const companyList = (
  <QueryClientProvider client={queryClient}>
    <CompanyList />
  </QueryClientProvider>
);

describe("CompanyList", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("can render loading", async () => {
    render(companyList);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("can render company list", async () => {
    render(companyList);
    expect(await screen.findAllByText(/[時日]給/)).toHaveLength(3);
    expect(screen.getAllByText(/株式会社/)).toHaveLength(3);
  });
});
