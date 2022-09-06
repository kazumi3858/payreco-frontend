import router from "next/router";
import axios from "axios";
import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    setLoading(true);
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
      {loading ? (
        <div>ログイン中</div>
      ) : (
        <button onClick={googleSignIn}>
          Gooleアカウントでログインして始める
        </button>
      )}
    </>
  );
}

export default Login;
