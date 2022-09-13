import Login from "components/templates/Login";
import router from "next/router";
import { auth } from "auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginPage() {
  const [user, isLoading] = useAuthState(auth);

  const redirect = () => {
    router.push("/");
  };

  if (isLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin h-16 w-16 bg-stone-200 rounded-xl"></div>
      </div>
    );

  return user ? redirect() : <Login />;
}
