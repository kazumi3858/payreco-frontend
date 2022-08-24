import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import DetailedSchedule from "components/organisms/DetailedSchedule";
import Menu from "components/organisms/Menu";
import Calendar from "components/organisms/Calendar";

function Main() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <Calendar />
      </div>
      <Menu />
      <Footer />
    </>
  );
}

export default Main;
