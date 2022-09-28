import "@testing-library/jest-dom";
import TargetAmountForm from "components/organisms/TagertAmountForm";
import userEvent from "@testing-library/user-event";
import * as firebaseAuth from "firebase/auth";
import { render, screen } from "@testing-library/react";
import { getMockUser1, getMockUser2 } from "api/users/users.msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { User } from "api/model";

jest.mock("firebase/auth", () => {
  const original: typeof firebaseAuth = jest.requireActual("firebase/auth");
  return { ...original, auth: jest.fn() };
});

const queryClient = new QueryClient();
const user = getMockUser1();
const userWithTargetAmount = getMockUser2();

const targetAmountForm = (user: User) => (
  <QueryClientProvider client={queryClient}>
    <TargetAmountForm user={user} />
  </QueryClientProvider>
);

describe("TargetAmountForm", () => {
  it("can render target amount form properly", async () => {
    render(targetAmountForm(user));
    expect(
      screen.getByText(
        "※目標金額を設定すると現時点での達成率が確認できるようになります。"
      )
    ).toBeInTheDocument();
  });

  it("can input value properly", async () => {
    const { getByLabelText } = render(targetAmountForm(user));
    const input = getByLabelText(/毎月の目標金額/);
    await userEvent.type(input, "111");
    expect(input).toHaveValue(111);
  });

  it("can validate target amount", async () => {
    window.alert = jest.fn();
    const { getByLabelText } = render(targetAmountForm(user));
    const input = getByLabelText(/毎月の目標金額/);
    await userEvent.type(input, "9999999");
    expect(
      screen.queryByText("目標金額が不正な値・または大きすぎます。")
    ).toBeNull();
    await userEvent.clear(input);
    await userEvent.type(input, "10000000");
    expect(
      screen.getByText("目標金額が不正な値・または大きすぎます。")
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText("保存"));
    expect(window.alert).toHaveBeenCalledWith(
      "目標金額が不正な値・または大きすぎます。"
    );
  });

  it("can show default value if user has set target amount", () => {
    const { getByLabelText } = render(targetAmountForm(userWithTargetAmount));
    expect(getByLabelText(/毎月の目標金額/)).toHaveValue(200000);
    expect(
      screen.queryByText(
        "※目標金額を設定すると現時点での達成率が確認できるようになります。"
      )
    ).toBeNull();
  });
});
