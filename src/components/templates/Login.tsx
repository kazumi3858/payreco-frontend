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
        <div className="mx-auto mb-10 max-w-lg py-10 px-4 sm:px-7 md:max-w-7xl md:px-6 lg:pb-20">
          <div className="lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center pt-7 drop-shadow-3xl">
              <div className="rounded-3xl bg-gradient-to-r from-main-gradient-l to-main-gradient-r px-3 pt-3 lg:to-[#CFDEE1]">
                <Image
                  className="rounded-2xl"
                  src="/main-image.png"
                  alt="サービスのメイン画像"
                  width={1700}
                  height={1000}
                />
              </div>
            </div>
            <section className="my-auto mt-auto text-center">
              <div className="mt-10">
                <Image src="/logo.png" alt="ロゴ" width={200} height={40} />
              </div>
              <h1 className="mt-5 mb-5 font-['游ゴシック'] text-2xl leading-relaxed tracking-widest text-black/70 md:text-3xl md:font-bold md:leading-relaxed">
                外貨もまとめて管理できる
                <br />
                シフト管理･給料計算ツール
              </h1>
              <div className="flex justify-center pb-5">
                <div className="text-left text-sm tracking-widest md:text-base">
                  <ul>
                    <li className="mb-3 border-b-2 border-stone-100/50 pb-2">
                      働いた時間を入力して簡単に給料計算
                    </li>
                    <li className="mb-3 border-b-2 border-stone-100/50 pb-2">
                      外貨の報酬は日本円に換算して表示
                    </li>
                    <li className="border-b-2 border-stone-100/50 pb-2">
                      シフト管理としても使える
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <div>ログイン中</div>
        ) : (
          <div>
            <button
              className="mt-4 mb-6 h-14 rounded-full bg-[#84a4aa] px-10 text-base tracking-wide text-white hover:bg-[#6b8287] md:text-lg"
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
        <h2 className="mt-20 mb-2 flex justify-center text-3xl font-bold md:mt-20">
          どんなサービス？
        </h2>
        <div className="flex justify-center py-5 px-10">
          <div className="max-w-2xl">
            <p className="mb-5 underline decoration-main-button-color decoration-wavy underline-offset-8">
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
        <h2 className="mt-10 mb-2 flex justify-center text-3xl font-bold">
          使い方
        </h2>
        <div className="mb-10 text-center md:mx-20 md:flex md:justify-center md:space-x-20 xl:mx-60 xl:space-x-28">
          <Description position={1} />
          <Description position={2} />
          <Description position={3} />
        </div>
      </section>
      <WaveImage />
      <Footor loginPage={true} />
    </>
  );
}

export default Login;
