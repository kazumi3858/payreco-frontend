import "@testing-library/jest-dom";
import LoadingIcon from "components/atoms/LoadingIcon";
import { render, screen } from "@testing-library/react";

describe("LoadingIcon", () => {
  it("can render loading properly", () => {
    render(<LoadingIcon />);
    expect(screen.getByText("Loading"));
  });
});
