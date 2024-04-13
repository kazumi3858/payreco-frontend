import DeleteAccount from "components/organisms/DeleteAccount";
import Main from "components/templates/Main";
import Head from "next/head";
import { useEffect } from "react";
import { auth } from "auth/firebase";
import { useDeleteUser } from "api/default/default";

export default function Account() {
  const deleteCurrentUser = useDeleteUser();

  // サービス終了のため、ページにアクセスがあると強制ログアウトします
  useEffect(()=> {
    deleteCurrentUser.mutate();
    auth.signOut();
  }, [])

  return (
    <>
      <Head>
        <title>ペイレコ - 退会方法</title>
      </Head>
      <Main>
        <DeleteAccount />
      </Main>
    </>
  );
}
