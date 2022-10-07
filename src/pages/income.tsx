import IncomeList from "components/organisms/IncomeList";
import Main from "components/templates/Main";
import Head from "next/head";

export default function Income() {
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
