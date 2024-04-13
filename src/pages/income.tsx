import IncomeList from "components/organisms/IncomeList";
import Main from "components/templates/Main";
import Head from "next/head";
import { useEffect } from "react";
import { auth } from "auth/firebase";
import { useDeleteUser } from "api/default/default";

export default function Income() {
  const deleteCurrentUser = useDeleteUser();

  // サービス終了のため、ページにアクセスがあると強制ログアウトします
  useEffect(()=> {
    deleteCurrentUser.mutate();
    auth.signOut();
  }, [])

  return (
    <>
      <Head>
        <title>ペイレコ - 給料計算</title>
      </Head>
      <Main>
        <IncomeList />
      </Main>
    </>
  );
}
