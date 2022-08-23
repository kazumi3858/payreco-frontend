import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Calendar from "components/organisms/Calendar";
import DetailedSchedule from "components/organisms/DetailedSchedule";
import Menu from "components/organisms/Menu";

function Main() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="lg:flex">
          <Calendar />
          <DetailedSchedule />
        </div>
      </div>
      <Menu />
      <Footer />
    </>
  );
}

export default Main;
