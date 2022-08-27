import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Menu from "components/organisms/Menu";
import Calendar from "components/organisms/Calendar";
import CompanyList from "components/organisms/CompanyList";

type Props = {
  content: string;
};

function Main({ content }: Props) {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        {content === "calendar" && <Calendar />}
        {content === "company" && <CompanyList />}
        {content === "salary" && <Calendar />}
      </div>
      <Menu />
      <Footer />
    </>
  );
}

export default Main;
