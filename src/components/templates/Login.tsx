import router from "next/router";
import axios from "axios";
import Description from "components/atoms/Description";
import Footor from "components/organisms/Footor";
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
            <h1 className="text-white/90 text-xl drop-shadow-lg mx-6 mt-3">
              ペ イ レ コ
            </h1>
          </div>
        </div>
        <div className="py-10 md:pb-20 mb-10 max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
          <div className="lg:grid lg:grid-cols-2">
            <div className="drop-shadow-3xl flex justify-center items-center">
              <div className="rounded-3xl bg-gradient-to-r from-main-gradient-l to-main-gradient-r p-5">
                <img
                  className="rounded-xl"
                  src="/main-image.png"
                  alt="サービスのメイン画像"
                />
              </div>
            </div>
            <div className="text-center my-auto">
              <h1 className="text-2xl md:text-3xl font-bold tracking-widest md:leading-relaxed mt-10 mb-5 leading-relaxed text-black/70">
                外貨もまとめて管理できる
                <br />
                シフト管理・給料計算ツール
              </h1>
              <div className="flex justify-center">
                <div className="text-left text-base md:text-lg tracking-widest">
                  <ul className="list-disc">
                    <li className="mb-1">働いた時間を入力して簡単に給料計算</li>
                    <li className="mb-1">外貨の報酬は日本円に換算して表示</li>
                    <li>シフト管理としても使える</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <div>ログイン中</div>
        ) : (
          <button
            className="text-base md:text-xl h-14 px-10 my-10 text-white bg-gradient-to-r from-main-gradient-l to-[#ACACA3] rounded-full tracking-wide"
            onClick={googleSignIn}
          >
            Googleアカウントでログインして始める
          </button>
        )}
      </div>
      <h2 className="mt-10 mb-2 flex justify-center text-3xl font-bold">
        どんなサービス？
      </h2>
      <div className="flex justify-center py-5 px-10">
        <div>
          <p className="mb-5">
            外貨の報酬がある方に向けて、働いた時間を登録するだけで今月いくら稼いだかを日本円表示してくれるサービスです。
          </p>
          <p className="mb-5">
            日本円の報酬も登録・管理できます。シフト時刻を入力できるのでシフト管理してもご利用いただけます。
          </p>
          <p className="text-sm mt-2">
            ※対応している通貨: 円 米ドル ユーロ 英ポンド インドルピー 豪ドル
            カナダドル ランド NZドル SGドル 人民元 スイスフラン
          </p>
        </div>
      </div>
      <h2 className="mt-10 mb-2 flex justify-center text-3xl font-bold">
        使い方
      </h2>
      <div className="md:flex md:justify-center md:space-x-20 text-center px-8">
        <Description text={0} image={0} />
        <Description text={1} image={1} />
        <Description text={2} image={2} />
      </div>
      <Footor loginPage={true} />
    </>
  );
}

export default Login;
