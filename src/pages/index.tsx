import Calendar from "components/organisms/Calendar";
import Main from "components/templates/Main";
import Head from "next/head";
import { useEffect } from "react";
import { auth } from "auth/firebase";
import { useDeleteUser } from "api/default/default";

export default function Home() {
  const deleteCurrentUser = useDeleteUser();

  // サービス終了のため、ページにアクセスがあると強制ログアウトします
  useEffect(()=> {
    deleteCurrentUser.mutate();
    auth.signOut();
  }, [])
  
  return (
    <>
      <Head>
        <title>ペイレコ - スケジュール管理</title>
      </Head>
      <Main>
        <Calendar />
      </Main>
    </>
  );
}
