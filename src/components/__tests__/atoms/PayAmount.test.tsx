import "@testing-library/jest-dom";
import PayAmount from "components/atoms/PayAmount";
import { render, screen } from "@testing-library/react";

describe("PayAmount", () => {
  it("can render pay amount properly", () => {
    render(<PayAmount text="合計" amount={1000} />);
    expect(screen.getByText("合計")).toBeInTheDocument();
    expect(screen.getByText("1,000")).toBeInTheDocument();
  });
});
