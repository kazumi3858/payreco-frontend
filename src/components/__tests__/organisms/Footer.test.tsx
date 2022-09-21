import "@testing-library/jest-dom";
import Footor from "components/organisms/Footor";
import { render, screen } from "@testing-library/react";

describe("Footor", () => {
  it("can render footor properly", () => {
    render(<Footor />);
    expect(screen.getByText("利用規約")).toBeInTheDocument();
    expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
  });
});
