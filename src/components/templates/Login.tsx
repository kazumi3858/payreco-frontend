import router from "next/router";
import axios from "axios";
import Description from "components/atoms/Description";
import Footor from "components/organisms/Footor";
import Link from "next/link";
import Image from "next/image";
import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = async () => {
    setIsLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        result.user.getIdToken(true).then(async (idToken) => {
          await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          router.push("/");
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="bg-gradient-to-r from-main-gradient-l to-main-gradient-r pt-5">
        <div className="text-right">
          <div className="mr-10 inline-block drop-shadow-xl">
            <h1 className="mx-6 mt-3 font-['游ゴシック'] text-2xl font-bold text-white drop-shadow-xl">
              ペ イ レ コ
            </h1>
          </div>
        </div>
        <div className="mx-auto mb-10 max-w-lg py-10 px-4 sm:px-7 md:max-w-7xl md:px-6 md:pb-20">
          <div className="lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center drop-shadow-4xl">
              <div className="rounded-3xl bg-gradient-to-r from-main-gradient-l to-main-gradient-r px-3 pt-3 lg:to-[#CFDEE1]">
                <Image
                  className="rounded-2xl"
                  src="/main-image.png"
                  alt="サービスのメイン画像"
                  width={640}
                  height={400}
                />
              </div>
            </div>
            <section className="my-auto text-center">
              <h1 className="mt-10 mb-5 font-['游ゴシック'] text-2xl font-bold leading-relaxed tracking-widest text-black/70 md:text-3xl md:leading-relaxed">
                外貨もまとめて管理できる
                <br />
                シフト管理・給料計算ツール
              </h1>
              <div className="flex justify-center">
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
          <button
            className="mt-10 mb-6 h-14 rounded-full bg-[#84a4aa] px-10 text-base tracking-wide text-white hover:bg-[#6b8287] md:text-lg"
            onClick={googleSignIn}
          >
            Googleアカウントでログインして始める
          </button>
        )}
      </div>
      <p className="px-10 text-center text-sm">
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
      <section>
        <h2 className="mt-14 mb-2 flex justify-center text-3xl font-bold md:mt-20">
          どんなサービス？
        </h2>
        <div className="flex justify-center py-5 px-10">
          <div className="max-w-2xl">
            <p className="mb-5">
              外貨の報酬がある方に向けた、働いた時間を登録するだけで
              <b>今月いくら稼いだかを日本円表示してくれるサービス</b>
              です。日本円の報酬も管理できます。シフトの確認もカンタンなのでスケジュール帳としても使えます。
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
        <div className="text-center md:mx-8 md:flex md:justify-center md:space-x-20 xl:mx-60">
          <Description position={1} />
          <Description position={2} />
          <Description position={3} />
        </div>
      </section>
      <Footor loginPage={true} />
    </>
  );
}

export default Login;
