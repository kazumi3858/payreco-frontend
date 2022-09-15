import "@testing-library/jest-dom";
import Calendar from "components/organisms/Calendar";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

describe("Calendar", () => {
  it("can render this month calendar", async () => {
    const thisMonth = format(new Date(), "yyyy年 MMMM", { locale: ja });
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Calendar />
      </QueryClientProvider>
    );
    expect(screen.getByText(thisMonth)).toBeInTheDocument();
  });
});
