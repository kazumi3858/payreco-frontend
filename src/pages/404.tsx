import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { auth } from "auth/firebase";
import { useDeleteUser } from "api/default/default";

export default function Custom404() {
  const deleteCurrentUser = useDeleteUser();

  // サービス終了のため、ページにアクセスがあると強制ログアウトします
  useEffect(()=> {
    deleteCurrentUser.mutate();
    auth.signOut();
  }, [])
  
  return (
    <>
      <Head>
        <title>ペイレコ - 存在しないページです</title>
      </Head>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-9xl font-bold text-sub-button">404</p>
          <p className="mb-10 text-2xl font-bold text-sub-button">
            存在しないページです
          </p>
          <Link href="/">
            <a>トップページに戻る</a>
          </Link>
        </div>
      </div>
    </>
  );
}
