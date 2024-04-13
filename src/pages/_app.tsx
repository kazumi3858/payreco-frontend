import SiteHead from "components/SiteHead";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect } from "react";
import { useDeleteUser } from "api/default/default";
import { auth } from "auth/firebase";


function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  // const deleteCurrentUser = useDeleteUser();

  // サービス終了のため、ページにアクセスがあると強制ログアウトします
  // useEffect(()=> {
  //   deleteCurrentUser.mutate();
  //   auth.signOut();
  // }, [])

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
