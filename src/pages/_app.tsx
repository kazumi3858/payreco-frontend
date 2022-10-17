import SiteHead from "components/SiteHead";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <>
      <SiteHead />
      <QueryClientProvider client={client}>
        <div className="font-body leading-8 tracking-wide text-[#4c4d4d]">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
