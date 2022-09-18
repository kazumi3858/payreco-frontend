import "@testing-library/jest-dom";
import DropDown from "components/atoms/DropDown";
import { fireEvent, render, screen } from "@testing-library/react";

describe("DropDown", () => {
  it("can render header properly", () => {
    render(<DropDown logout={jest.fn()} visitQuestion={jest.fn()} />);
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
    expect(screen.getByText("よくある質問")).toBeInTheDocument();
  });

  it("can call click event", () => {
    const clickLogout = jest.fn();
    const clickQuestion = jest.fn();
    render(<DropDown logout={clickLogout} visitQuestion={clickQuestion} />);
    fireEvent.click(screen.getByText("ログアウト"));
    expect(clickLogout).toHaveBeenCalled();
    fireEvent.click(screen.getByText("よくある質問"));
    expect(clickQuestion).toHaveBeenCalled();
  });
});
