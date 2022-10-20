import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Menu from "components/organisms/Menu";
import router from "next/router";
import { auth } from "auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = { children: JSX.Element };

function Main({ children }: Props) {
  const [user, isLoading] = useAuthState(auth);

  const redirect = () => {
    router.push("/login");
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-xl bg-main-button"></div>
      </div>
    );

  return (
    <>
      {user ? (
        <div className="bg-stone-100">
          <div className="min-h-screen">
            <Header />
            <div className="z-0">{children}</div>
          </div>
          <Menu />
          <Footer isLoginPage={false} />
        </div>
      ) : (
        redirect()
      )}
    </>
  );
}

export default Main;
