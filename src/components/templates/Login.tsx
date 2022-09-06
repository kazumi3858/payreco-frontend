import { auth, provider } from "auth/firebase";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import router from "next/router";
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        result.user.getIdToken(true).then((idToken) => {
          axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, null, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          console.log(idToken);
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
          Gooleアカウントでログインして開始
        </button>
      )}
    </>
  );
}

export default Login;
