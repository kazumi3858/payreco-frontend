import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Menu from "components/organisms/Menu";
import Calendar from "components/organisms/Calendar";
import CompanyList from "components/organisms/CompanyList";
import IncomeList from "components/organisms/IncomeList";

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
        {content === "income" && <IncomeList />}
      </div>
      <Menu />
      <Footer />
    </>
  );
}

export default Main;
