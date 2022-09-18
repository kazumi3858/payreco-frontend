import "@testing-library/jest-dom";
import Button from "components/atoms/Button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button", () => {
  it("can call click event", () => {
    const onClick = jest.fn();
    render(<Button text="button text" onClick={onClick} />);
    expect(screen.getByText("button text")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
