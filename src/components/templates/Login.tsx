import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const googleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) =>
      console.log(error.message)
    );
  };

  return <button onClick={googleSignIn}>サインイン</button>;
}

export default Login;
