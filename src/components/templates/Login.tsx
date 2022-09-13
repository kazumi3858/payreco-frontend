import router from "next/router";
import axios from "axios";
import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      <div className="bg-gradient-to-r from-stone-100 via-stone-100 to-stone-100 h-96">
        <p>ペイレコ</p>
        <p>外貨は日本円で計算</p>
        <p>シフト管理・給料計算ツール</p>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <div>ログイン中</div>
        ) : (
          <button
            className="h-20 px-10 my-10 bg-stone-200 rounded-full"
            onClick={googleSignIn}
          >
            Googleアカウントでログインして始める
          </button>
        )}
      </div>
    </>
  );
}

export default Login;
