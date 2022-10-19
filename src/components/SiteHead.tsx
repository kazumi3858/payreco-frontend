import Head from "next/head";

function SiteHead() {
  return (
    <Head>
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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href="https://payreco.vercel.app/" />
    </Head>
  );
}

export default SiteHead;
