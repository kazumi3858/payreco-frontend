import "@testing-library/jest-dom";
import Label from "components/atoms/Label";
import { render, screen } from "@testing-library/react";

describe("Label", () => {
  it("can render label title properly", () => {
    render(<Label width="w-20" title="label title" />);
    expect(screen.getByText("label title"));
  });
});
