import Calendar from "components/organisms/Calendar";
import Main from "components/templates/Main";
import Head from "next/head";

export default function Home() {
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
