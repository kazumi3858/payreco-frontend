import "@testing-library/jest-dom";
import Heading from "components/atoms/Heading";
import { render, screen } from "@testing-library/react";

describe("render button properly", () => {
  it("can render text properly", () => {
    render(<Heading text="heading text" />);
    expect(screen.getByText("heading text")).toBeInTheDocument();
  });
});
