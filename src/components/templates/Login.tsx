import router from "next/router";
import axios from "axios";
import Description from "components/atoms/Description";
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
            <h1 className="text-white/70 text-lg mx-6 my-3">ペ イ レ コ</h1>
          </div>
        </div>
        <div className="py-20 mb-10 max-w-lg px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
          <div className="lg:grid lg:grid-cols-2">
            <div className="drop-shadow-2xl flex justify-center items-center">
              <img
                className="rounded-3xl"
                src="https://user-images.githubusercontent.com/97820517/191658227-9e607d49-fc2c-40b3-8d17-2580688ccdcd.png"
                alt="main content image"
              />
            </div>
            <div className="text-center my-auto">
              <h1 className="text-3xl md:text-4xl font-bold tracking-widest md:leading-relaxed mt-10 mb-5 leading-relaxed text-large-description">
                外貨もまとめて管理できる
                <br />
                シフト管理・給料計算ツール
              </h1>
              <ul>
                <li>働いた時間を入力して簡単に給料計算。</li>
                <li>外貨の報酬は日本円に換算して表示。</li>
                <li>シフト管理としても使うことができます。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <div>ログイン中</div>
        ) : (
          <button
            className="text-xl h-14 px-10 my-10 text-white bg-gradient-to-r from-sub-gradient-l to-sub-gradient-r rounded-full tracking-wide"
            onClick={googleSignIn}
          >
            Googleアカウントでログインして始める
          </button>
        )}
      </div>
      <h2 className="mt-10 mb-2 flex justify-center text-3xl font-bold">
        使い方
      </h2>
      <div className="md:flex md:justify-center md:space-x-20 text-center">
        <Description text={0} image={0} />
        <Description text={1} image={1} />
        <Description text={2} image={2} />
      </div>
      <div className="space-x-10 text-center py-2">
        <Link href="/terms">
          <a>利用規約</a>
        </Link>
        <Link href="/policy">
          <a>プライバシーポリシー</a>
        </Link>
      </div>
    </>
  );
}

export default Login;
