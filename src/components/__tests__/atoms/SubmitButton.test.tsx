import "@testing-library/jest-dom";
import SubmitButton from "components/atoms/SubmitButton";
import { render, screen } from "@testing-library/react";

describe("SubmitButton", () => {
  it("can render submit button properly", () => {
    render(<SubmitButton updating={false} disabled={false} />);
    expect(screen.getByText("保存")).toBeInTheDocument();
  });

  it("cannot click while updating", () => {
    render(<SubmitButton updating={true} disabled={true} />);
    expect(screen.getByText("保存中...")).toBeDisabled();
  });
});
