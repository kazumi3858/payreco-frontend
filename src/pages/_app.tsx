import SiteHead from "components/SiteHead";
import Login from "components/templates/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auth } from "auth/firebase";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-4xl">Loading</p>
      </div>
    );

  return (
    <>
      <SiteHead />
      {user ? (
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
