import Head from "next/head";
import Link from "next/link";

function Policy() {
  const headStyle = "text-lg mt-5 mb-2 font-bold";
  const listStyle = "my-2 list-disc pl-5";

  return (
    <>
      <Head>
        <title>ペイレコ - プライバシーポリシー</title>
      </Head>
      <div className="mx-auto max-w-2xl">
        <div className="my-10 px-5 text-sm">
          <h1 className="mb-4 border-b-4 border-main-button pb-3 text-center text-3xl font-bold">
            プライバシーポリシー
          </h1>
          <p>
            本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </p>
          <h2 className={headStyle}>第1条（個人情報）</h2>
          <p>
            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、特定の個人を識別できる情報（個人識別情報）を指します。
          </p>
          <h2 className={headStyle}>第2条（個人情報の収集方法）</h2>
          <p>
            本サービスは、ユーザーが利用登録をする際にユーザーのGoogleアカウント情報を取得します。
          </p>
          <h2 className={headStyle}>第3条（個人情報を収集・利用する目的）</h2>
          <p>本サービスが個人情報を収集・利用する目的は、以下のとおりです。</p>
          <ul className={listStyle}>
            <li>本サービスの提供・運営のため</li>
            <li>
              ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
            </li>
            <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
            <li>
              利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
            </li>
            <li>
              ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため
            </li>
            <li>上記の利用目的に付随する目的</li>
          </ul>
          <h2 className={headStyle}>第4条（利用目的の変更）</h2>
          <p>
            本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
          </p>
          <p>
            利用目的の変更を行った場合には、変更後の目的について、本サービス所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
          </p>
          <h2 className={headStyle}>第5条（個人情報の第三者提供）</h2>
          <p>
            本サービスはユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
          </p>
          <h2 className={headStyle}>第6条（退会時）</h2>
          <p>
            ユーザーが本サービスの退会手続きを行った場合、本サービスはユーザーの個人情報を全て削除します。
          </p>
          <h2 className={headStyle}>第7条（プライバシーポリシーの変更）</h2>
          <p>
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
          </p>
          <p>
            本サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </p>
          <div className="mt-5 text-center">
            <Link href="/">
              <a>トップページに戻る</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Policy;
