import "@testing-library/jest-dom";
import Menu from "components/organisms/Menu";
import { render, screen } from "@testing-library/react";

describe("Menu", () => {
  it("can render menu", () => {
    render(<Menu />);
    expect(screen.getByText("スケジュール")).toBeInTheDocument();
    expect(screen.getByText("勤務先管理")).toBeInTheDocument();
    expect(screen.getByText("給料計算")).toBeInTheDocument();
  });
});
