import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Menu from "components/organisms/Menu";
import { auth } from "auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";

type Props = {
  children: JSX.Element;
};

function Main({ children }: Props) {
  const [user, loading] = useAuthState(auth);

  const redirect = () => {
    router.push("/login");
  };

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin h-16 w-16 bg-stone-200 rounded-xl"></div>
      </div>
    );

  return (
    <>
      {user ? (
        <>
          <div className="min-h-screen">
            <Header />
            <div className="z-0">{children}</div>
          </div>
          <Menu />
          <Footer />
        </>
      ) : (
        redirect()
      )}
    </>
  );
}

export default Main;
