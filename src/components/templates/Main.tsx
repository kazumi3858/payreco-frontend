import Header from "components/organisms/Header";
import Footer from "components/organisms/Footor";
import Menu from "components/organisms/Menu";
import Calendar from "components/organisms/Calendar";
import CompanyList from "components/organisms/CompanyList";
import IncomeList from "components/organisms/IncomeList";
import { useGetWorks } from "api/works/works";
import { useGetCompanies } from "api/companies/companies";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";

type Props = {
  content: string;
};

function Main({ content }: Props) {
  const { data: works } = useGetWorks();
  const { data: companies } = useGetCompanies();
  const { data: exchangeRates } = useGetExchangeRates();
  return (
    <>
      <div className="min-h-screen">
        <Header />
        {content === "calendar" && <Calendar works={works} />}
        {content === "company" && <CompanyList companies={companies} />}
        {content === "income" && (
          <IncomeList
            works={works}
            companies={companies}
            exchangeRates={exchangeRates}
          />
        )}
      </div>
      <Menu />
      <Footer />
    </>
  );
}

export default Main;
