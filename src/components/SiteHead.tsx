import Head from "next/head";

function SiteHead() {
  return (
    <Head>
      <title>ペイレコ</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="description"
        content="外貨もまとめて管理できる シフト管理・給料計算ツール"
      />
      <meta property="og:title" content="ペイレコ" />
      <meta
        property="og:description"
        content="外貨もまとめて管理できる シフト管理・給料計算ツール"
      />
      <meta
        property="og:image"
        content="https://payreco.vercel.app/twitter-card.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}

export default SiteHead;
