import Login from "components/templates/Login";
import router from "next/router";
import Head from "next/head";
import { auth } from "auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginPage() {
  const [user, isLoading] = useAuthState(auth);

  const redirect = () => {
    router.push("/");
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-xl bg-stone-200"></div>
      </div>
    );

  return user ? (
    redirect()
  ) : (
    <>
      <Head>
        <title>
          ペイレコ - 外貨もまとめて管理できるシフト管理･給料計算ツール
        </title>
      </Head>
      <Login />
    </>
  );
}
