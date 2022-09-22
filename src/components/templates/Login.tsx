import router from "next/router";
import axios from "axios";
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
      <div className="pt-5 bg-gradient-to-r from-[#E3E7E5] to-[#9EB2B4]">
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
              <h1 className="text-3xl mb-5">
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
            className="h-20 px-10 my-10 text-white bg-[#799287] rounded-full"
            onClick={googleSignIn}
          >
            Googleアカウントでログインして始める
          </button>
        )}
      </div>
      <div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </>
  );
}

export default Login;
