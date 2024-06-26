import SiteHead from "components/SiteHead";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
      <SiteHead />
        <div className="font-body leading-8 tracking-wide text-[#4C4D4D]">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
