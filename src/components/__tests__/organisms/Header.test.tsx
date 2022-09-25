import "@testing-library/jest-dom";
import Header from "components/organisms/Header";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Header", () => {
  it("can render header properly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    );
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
    expect(screen.getByText("ヘルプ")).toBeInTheDocument();
  });
});
