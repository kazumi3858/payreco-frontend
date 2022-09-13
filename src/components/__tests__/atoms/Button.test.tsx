import "@testing-library/jest-dom";
import Button from "components/atoms/Button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("render button properly", () => {
  it("can call onClick event", () => {
    const onClick = jest.fn();
    render(<Button text="text" onClick={onClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
