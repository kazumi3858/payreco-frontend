import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

function Login() {
  const [disable, setDisable] = useState(false);
  const googleSignIn = () => {
    setDisable(true);
    signInWithPopup(auth, provider).catch((error) =>
      console.log(error.message)
    );
  };

  return (
    <button disabled={disable} onClick={googleSignIn}>
      サインイン
    </button>
  );
}

export default Login;
