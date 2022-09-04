import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Menu from "components/organisms/Menu";

type Props = {
  children: JSX.Element;
};

function Main({ children }: Props) {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="z-0">{children}</div>
      </div>
      <Menu />
      <Footer />
    </>
  );
}

export default Main;
