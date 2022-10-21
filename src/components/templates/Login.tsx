import Description from "components/atoms/Description";
import Footor from "components/organisms/Footor";
import Link from "next/link";
import Image from "next/image";
import WaveImage from "components/atoms/WaveImage";
import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(() => console.log("Logged in"))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="bg-gradient-to-r from-main-gradient-l to-main-gradient-r">
        <div className="mx-auto max-w-lg px-6 pt-10 sm:px-10 md:max-w-7xl">
          <div className="lg:grid lg:grid-cols-2">
            <div className="mt-7 flex items-center justify-center drop-shadow-3xl">
              <Image
                className="rounded-xl"
                src="/main-image.png"
                alt="サービスのメイン画像"
                width={1700}
                height={1000}
              />
            </div>
            <section className="my-auto mt-auto text-center">
              <div className="mt-10 opacity-75">
                <Image src="/logo.png" alt="ロゴ" width={250} height={50} />
              </div>
              <h1 className="mt-6 mb-5 font-['游ゴシック'] text-2xl font-semibold leading-relaxed tracking-widest text-black/70 md:mt-10 md:text-3xl md:leading-relaxed">
                外貨の報酬がある人のための
                <br />
                かんたん給料計算ツール
              </h1>
              <div className="flex justify-center pb-5">
                <div className="text-left text-sm tracking-widest md:text-base">
                  <ul>
                    <li className="mb-3 border-b-2 border-stone-100/50 pb-2">
                      外貨の報酬を日本円にして表示
                    </li>
                    <li className="mb-3 border-b-2 border-stone-100/50 pb-2">
                      今月いくら稼いだかをかんたんに確認できる
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
        <WaveImage isUpper />
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <p>ログイン中</p>
        ) : (
          <div>
            <button
              className="mt-10 mb-6 h-14 rounded-full bg-[#174378] px-10 text-base tracking-wide text-white hover:bg-[#3546B4] md:text-lg"
              onClick={googleSignIn}
            >
              Googleでログインして始める
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center px-10">
        <div className="max-w-2xl text-xs">
          <p className="mb-2">
            ※上記ボタンをクリックすることで
            <Link href="/terms">
              <a className="text-stone-500 hover:text-stone-700">利用規約</a>
            </Link>
            ・
            <Link href="/policy">
              <a className="text-stone-500 hover:text-stone-700">
                プライバシーポリシー
              </a>
            </Link>
            に同意したものとみなします。
          </p>
          <p>※無料でご利用いただけます。</p>
        </div>
      </div>
      <section>
        <h2 className="mt-20 mb-2 flex justify-center font-['游ゴシック'] text-3xl font-bold md:mt-20">
          どんなサービス？
        </h2>
        <div className="flex justify-center py-5 px-10">
          <div className="max-w-2xl">
            <p className="mb-5 underline decoration-main-button underline-offset-8">
              外貨の報酬がある方に向けた、働いた時間を登録するだけで
              <b>今月いくら稼いだかを日本円表示してくれるサービス</b>
              です。シフトの確認もカンタンなのでスケジュール帳としても使えます。
            </p>
            <p className="mt-2 text-xs">
              ※対応している通貨: 円 米ドル ユーロ 英ポンド インドルピー 豪ドル
              カナダドル ランド NZドル SGドル 人民元 スイスフラン
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="mt-10 mb-2 flex justify-center font-['游ゴシック'] text-3xl font-bold">
          操作はこれだけ！
        </h2>
        <div className="m-auto max-w-5xl">
          <div className="md:grid md:grid-cols-3 md:justify-between">
            <Description position={1} />
            <Description position={2} />
            <Description position={3} />
          </div>
        </div>
      </section>
      <WaveImage isUpper={false} />
      <Footor isLoginPage />
    </>
  );
}

export default Login;
