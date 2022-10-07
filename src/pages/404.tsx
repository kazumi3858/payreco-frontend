import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>ペイレコ - 存在しないページです</title>
      </Head>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-9xl font-bold text-sub-button-color">404</p>
          <p className="mb-10 text-2xl font-bold text-sub-button-color">
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
