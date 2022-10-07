import Questions from "components/organisms/Questions";
import Main from "components/templates/Main";
import Head from "next/head";

export default function Account() {
  return (
    <>
      <Head>
        <title>ペイレコ - ヘルプ</title>
      </Head>
      <Main>
        <Questions />
      </Main>
    </>
  );
}
