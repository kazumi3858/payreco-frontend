import { useGetCompanies } from "api/companies/companies";
import { Company, Work } from "api/model";
import CompanyForm from "components/molecules/CompanyForm";
import WorkForm from "components/molecules/WorkForm";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import DetailedSchedule from "./DetailedSchedule";

type Props = {
  selectedDay: Date;
  selectedDayWorks?: Work[];
};

function ScheduleList({ selectedDay, selectedDayWorks }: Props) {
  const { data } = useGetCompanies();
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  return (
    <section className="mt-12 md:mt-0 md:pl-14">
      <span className="font-semibold text-lg text-gray-900">
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "MMM dd日", { locale: ja })}
        </time>
        の予定
      </span>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectedDayWorks && selectedDayWorks.length > 0 ? (
          selectedDayWorks.map((work) => (
            <DetailedSchedule
              selectedDay={selectedDay}
              work={work}
              key={work.id}
              company={data?.find((v) => v.id === work.company_id)}
            />
          ))
        ) : (
          <p>予定はありません。</p>
        )}
      </ol>
      <p className="pt-10 pb-3 text-lg">勤務先を選んで予定を追加</p>
      <div className="mb-10">
        {data && data.length > 0 ? (
          data.map((company) => (
            <button
              key={company.id}
              className="m-2 p-2 bg-stone-100 rounded-md"
              onClick={() => {
                setWorkForm(true);
                setSelectedCompany(company);
              }}
            >
              {company.name}
            </button>
          ))
        ) : (
          <p>
            勤務先の登録がありません。勤務先を登録をすると予定を追加できるようになります。
          </p>
        )}
        <button onClick={() => setCompanyForm(true)}>＋勤務先を登録</button>
      </div>
      {workForm && (
        <WorkForm
          selectedDay={selectedDay}
          company={selectedCompany}
          setWorkForm={setWorkForm}
        />
      )}
      {companyForm && <CompanyForm setCompanyForm={setCompanyForm} />}
    </section>
  );
}

export default ScheduleList;
