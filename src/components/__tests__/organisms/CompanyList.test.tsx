import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
import CompanyList from "components/organisms/CompanyList";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { getCompaniesMSW } from "api/companies/companies.msw";

const server = setupServer(...getCompaniesMSW());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();
const companyList = (
  <QueryClientProvider client={queryClient}>
    <CompanyList />
  </QueryClientProvider>
);

describe("CompanyList", () => {
  it("can render company list", async () => {
    render(companyList);
    //await waitFor(()=>expect(screen.getByText(/株式会社/)).toBeInTheDocument())
  });
});
