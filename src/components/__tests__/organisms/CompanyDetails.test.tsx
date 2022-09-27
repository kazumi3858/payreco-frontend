import "@testing-library/jest-dom";
import CompanyDetails from "components/organisms/CompanyDetails";
import { render, screen } from "@testing-library/react";
import { getCompanyMock } from "api/companies/companies.msw";

const company = getCompanyMock[0]

describe("CompanyDetails", () => {
  it("can render company details", () => {
    render(<CompanyDetails company={company} />);
    expect(screen.getByText("株式会社田中")).toBeInTheDocument();
    expect(screen.getByText("時給1500円")).toBeInTheDocument();
  });
});
