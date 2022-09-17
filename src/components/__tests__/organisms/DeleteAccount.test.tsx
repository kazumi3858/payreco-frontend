import "@testing-library/jest-dom";
import DeleteAccount from "components/organisms/DeleteAccount";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("firebase/auth", () => {
  return {
    auth: jest.fn(),
  };
});

const queryClient = new QueryClient();

describe("DeleteAccount", () => {
  it("can render delete abbount button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteAccount />
      </QueryClientProvider>
    );
    expect(screen.getByText(/退会方法/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "退会する" })
    ).toBeInTheDocument();
  });
});
