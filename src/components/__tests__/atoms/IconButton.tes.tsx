import "@testing-library/jest-dom";
import IconButton from "components/atoms/IconButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("IconButton", () => {
  it("can call click event", () => {
    const onClick = jest.fn();
    render(<IconButton edit={true} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
