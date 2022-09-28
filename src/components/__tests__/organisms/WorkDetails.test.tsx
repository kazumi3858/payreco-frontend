import "@testing-library/jest-dom";
import WorkDetails from "components/organisms/WorkDetails";
import { render, screen } from "@testing-library/react";
import { getGetWorksMock } from "api/works/works.msw";
import { getCompaniesMock } from "api/companies/companies.msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const work = getGetWorksMock()[0];
const company = getCompaniesMock()[0];
const queryClient = new QueryClient();

describe("WorkDetails", () => {
  it("can render work details properly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WorkDetails work={work} selectedDay={new Date()} company={company} />
      </QueryClientProvider>
    );
    expect(screen.getByText("8:00 AM - 4:00 PM")).toBeInTheDocument();
    expect(screen.getByText("株式会社abc")).toBeInTheDocument();
    expect(screen.getByText(/1時間/)).toBeInTheDocument();
    expect(screen.getByText(/7時間/)).toBeInTheDocument();
    expect(screen.getByText(/70米ドル/)).toBeInTheDocument();
    expect(screen.getByText("メモです")).toBeInTheDocument();
  });
});
