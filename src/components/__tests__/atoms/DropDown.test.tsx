import "@testing-library/jest-dom";
import DropDown from "components/atoms/DropDown";
import { fireEvent, render, screen } from "@testing-library/react";

describe("DropDown", () => {
  it("can render header properly", () => {
    render(<DropDown logoutEvent={jest.fn()} helpEvent={jest.fn()} />);
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
    expect(screen.getByText("ヘルプ")).toBeInTheDocument();
  });

  it("can call click event", () => {
    const clickLogout = jest.fn();
    const clickHelp = jest.fn();
    render(<DropDown logoutEvent={clickLogout} helpEvent={clickHelp} />);
    fireEvent.click(screen.getByText("ログアウト"));
    expect(clickLogout).toHaveBeenCalled();
    fireEvent.click(screen.getByText("ヘルプ"));
    expect(clickHelp).toHaveBeenCalled();
  });
});
