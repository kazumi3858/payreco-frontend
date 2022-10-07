import CompanyList from "components/organisms/CompanyList";
import Main from "components/templates/Main";
import Head from "next/head";

export default function Companies() {
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
