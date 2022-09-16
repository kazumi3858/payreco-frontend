import "@testing-library/jest-dom";
import CompanyDetails from "components/organisms/CompanyDetails";
import { render, screen } from "@testing-library/react";
import { getGetCompaniesMock } from "api/companies/companies.msw";

describe("CompanyDetails", () => {
  const company = getGetCompaniesMock()[0];
  it("can render company details", () => {
    render(<CompanyDetails company={company} />);
    expect(screen.getByText(/株式会社/)).toBeInTheDocument();
    expect(screen.getByText(/[時日]給/)).toBeInTheDocument();
  });
});
