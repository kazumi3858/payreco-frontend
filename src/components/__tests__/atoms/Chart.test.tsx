import "@testing-library/jest-dom";
import Chart from "components/atoms/Chart";
import { render, screen } from "@testing-library/react";

describe("Chart", () => {
  it("can render achievement rates properly", async () => {
    render(
      <Chart target={100000} earnedIncome={50000} expectedIncome={20000} />
    );
    expect(screen.getByText(/本日まで: 50%/)).toBeInTheDocument();
    expect(screen.getByText(/見込み含め: 70%/)).toBeInTheDocument();
  });

  it("can render '100%' when earned income is higher than target", async () => {
    render(<Chart target={100000} earnedIncome={100001} expectedIncome={0} />);
    expect(screen.getByText(/本日まで: 100%/)).toBeInTheDocument();
    expect(screen.getByText(/見込み含め: 100%/)).toBeInTheDocument();
  });
});
