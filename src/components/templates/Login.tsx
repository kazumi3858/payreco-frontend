import router from "next/router";
import axios from "axios";
import Description from "components/atoms/Description";
import Footor from "components/organisms/Footor";
import Link from "next/link";
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
      <div className="pt-5 bg-gradient-to-r from-main-gradient-l to-main-gradient-r">
        <div className="text-right">
          <div className="inline-block mr-10 drop-shadow-xl">
            <h1 className="font-['游ゴシック'] text-white font-bold text-2xl drop-shadow-xl mx-6 mt-3">
              ペ イ レ コ
            </h1>
          </div>
        </div>
        <div className="py-10 md:pb-20 mb-10 max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
          <div className="lg:grid lg:grid-cols-2">
            <div className="drop-shadow-4xl flex justify-center items-center">
              <div className="rounded-3xl bg-gradient-to-r from-main-gradient-l to-main-gradient-r lg:to-[#CFDEE1] p-3">
                <img
                  className="rounded-2xl"
                  src="main-image.png"
                  alt="サービスのメイン画像"
                />
              </div>
            </div>
            <section className="text-center my-auto">
              <h1 className="font-['游ゴシック'] text-2xl md:text-3xl font-bold tracking-widest md:leading-relaxed mt-10 mb-5 leading-relaxed text-black/70">
                外貨もまとめて管理できる
                <br />
                シフト管理・給料計算ツール
              </h1>
              <div className="flex justify-center">
                <div className="text-left text-sm md:text-base tracking-widest">
                  <ul>
                    <li className="mb-3 pb-2 border-b-2 border-stone-100/50">
                      働いた時間を入力して簡単に給料計算
                    </li>
                    <li className="mb-3 pb-2 border-b-2 border-stone-100/50">
                      外貨の報酬は日本円に換算して表示
                    </li>
                    <li className="pb-2 border-b-2 border-stone-100/50">
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
            className="text-base md:text-lg h-14 px-10 mt-10 mb-6 text-white bg-[#84a4aa] hover:bg-[#6b8287] rounded-full tracking-wide"
            onClick={googleSignIn}
          >
            Googleアカウントでログインして始める
          </button>
        )}
      </div>
      <p className="text-sm text-center px-10">
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
        <h2 className="mt-14 md:mt-20 mb-2 flex justify-center text-3xl font-bold">
          どんなサービス？
        </h2>
        <div className="flex justify-center py-5 px-10">
          <div className="max-w-2xl">
            <p className="mb-5">
              外貨の報酬がある方に向けた、働いた時間を登録するだけで
              <b>今月いくら稼いだかを日本円表示してくれるサービス</b>
              です。日本円の報酬も管理できます。シフトの確認もカンタンなのでスケジュール帳としても使えます。
            </p>
            <p className="text-xs mt-2">
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
        <div className="md:flex md:justify-center md:space-x-20 text-center md:mx-8 xl:mx-60">
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
