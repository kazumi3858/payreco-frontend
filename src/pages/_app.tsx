import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SiteHead from "components/SiteHead";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  return (
    <>
      <SiteHead />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
