import { useDeleteUser } from "api/default/default";
import CompanyList from "components/organisms/CompanyList";
import Main from "components/templates/Main";
import Head from "next/head";
import { useEffect } from "react";
import { auth } from "auth/firebase";

export default function Companies() {
  const deleteCurrentUser = useDeleteUser();

  // サービス終了のため、ページにアクセスがあると強制ログアウトします
  useEffect(()=> {
    deleteCurrentUser.mutate();
    auth.signOut();
  }, [])

  return (
    <>
      <Head>
        <title>ペイレコ - 勤務先管理</title>
      </Head>
      <Main>
        <CompanyList />
      </Main>
    </>
  );
}
