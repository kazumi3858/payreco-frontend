import Head from "next/head";

function SiteHead() {
  return (
    <Head>
      <title>ペイレコ</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="description" content="説明" />
      <meta property="og:title" content="ペイレコ" />
      <meta property="og:description" content="説明" />
      {/* <meta property="og:image" content={`imageUrl`} />
        <meta property="og:image:width" content={String(imgWidth)} />
        <meta property="og:image:height" content={String(imgHeight)} /> */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}

export default SiteHead;
