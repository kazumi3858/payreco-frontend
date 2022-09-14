import "@testing-library/jest-dom";
import Heading from "components/atoms/Heading";
import { render, screen } from "@testing-library/react";

describe("Heading", () => {
  it("can render text properly", () => {
    render(<Heading text="heading text" />);
    expect(screen.getByText("heading text")).toBeInTheDocument();
  });
});
