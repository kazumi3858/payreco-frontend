import { usePostUser } from "api/users/users";
import { auth, provider } from "auth/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const mutation = usePostUser();
  const googleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) =>
      console.log(error.message)
    );
    mutation.mutate({ data: null });
  };
  return (
    <>
      {user ? (
        router.push("/")
      ) : (
        <button onClick={googleSignIn}>サインイン</button>
      )}
    </>
  );
}
