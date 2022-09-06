import { useGetUsersUserId } from "api/users/users";
import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import router from "next/router";
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);
  const { data } = useGetUsersUserId();
  const googleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        data
        router.push("/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      {loading ? (
        <div>ログイン中</div>
      ) : (
        <button onClick={googleSignIn}>Gooleアカウントでログインして開始</button>
      )}
    </>
  );
}

export default Login;
