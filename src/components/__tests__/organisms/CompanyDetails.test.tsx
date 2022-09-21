import "@testing-library/jest-dom";
import CompanyDetails from "components/organisms/CompanyDetails";
import { render, screen } from "@testing-library/react";
import { getGetCompaniesMock } from "api/companies/companies.msw";

const company = getGetCompaniesMock()[0];

describe("CompanyDetails", () => {
  it("can render company details", () => {
    render(<CompanyDetails company={company} />);
    expect(screen.getByText(/株式会社abc/)).toBeInTheDocument();
    expect(screen.getByText(/時給10米ドル/)).toBeInTheDocument();
  });
});
