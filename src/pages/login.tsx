import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [user] = useAuthState(auth);

  const googleSignIn = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <>
      {user ? (
        <button onClick={() => auth.signOut()}>サインアウト</button>
      ) : (
        <button onClick={googleSignIn}>サインイン</button>
      )}
    </>
  );
}
