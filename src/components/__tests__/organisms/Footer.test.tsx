import "@testing-library/jest-dom";
import Footor from "components/organisms/Footor";
import { render, screen } from "@testing-library/react";

describe("Footor", () => {
  it("can render footor properly in login page", () => {
    render(<Footor loginPage />);
    expect(screen.queryByText("退会方法")).toBeNull();
  });

  it("can render footor properly in main page", () => {
    render(<Footor loginPage={false} />);
    expect(screen.getByText("退会方法")).toBeInTheDocument();
  });
});
