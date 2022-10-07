import DeleteAccount from "components/organisms/DeleteAccount";
import Main from "components/templates/Main";
import Head from "next/head";

export default function Account() {
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
