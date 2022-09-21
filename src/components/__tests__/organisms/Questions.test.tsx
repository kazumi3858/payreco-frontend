import "@testing-library/jest-dom";
import Questions from "components/organisms/Questions";
import { render, screen } from "@testing-library/react";

describe("Questions", () => {
  it("can render questions properly", () => {
    render(<Questions />);
    expect(screen.getByText("よくある質問")).toBeInTheDocument();
  });
});
