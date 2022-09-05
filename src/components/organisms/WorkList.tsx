import { useGetCompanies } from "api/companies/companies";
import { Company, Work } from "api/model";
import Button from "components/atoms/Button";
import CompanyForm from "components/organisms/CompanyForm";
import WorkForm from "components/organisms/WorkForm";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import WorkDetails from "./WorkDetails";

type Props = {
  selectedDay: Date;
  selectedDayWorks?: Work[];
};

function WorkList({ selectedDay, selectedDayWorks }: Props) {
  const { data, isLoading } = useGetCompanies();
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>();

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    workForm && modalRef.current && modalRef.current.focus();
  }, [workForm]);

  return (
    <section className="mt-12 md:mt-0 md:pl-14">
      <span className="font-semibold text-lg text-gray-900">
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "MMM dd日", { locale: ja })}
        </time>
        の予定
      </span>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {selectedDayWorks && selectedDayWorks.length > 0 ? (
            selectedDayWorks.map((work) => (
              <WorkDetails
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
      )}
      <p className="pt-10 pb-3 text-lg">勤務先を選んで予定を追加</p>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="mb-10">
          {data && data.length > 0 ? (
            data.map((company) => (
              <Button
                key={company.id}
                text={company.name}
                onClick={() => {
                  setWorkForm(true);
                  setSelectedCompany(company);
                }}
              />
            ))
          ) : (
            <p>
              勤務先の登録がありません。勤務先を登録をすると予定を追加できるようになります。
            </p>
          )}
          <Button
            text="＋勤務先を追加する"
            onClick={() => setCompanyForm(true)}
          />
        </div>
      )}
      {workForm && (
        <div onClick={() => setWorkForm(false)}>
          <WorkForm
            selectedDay={selectedDay}
            company={selectedCompany}
            setWorkForm={setWorkForm}
          />
        </div>
      )}
      {companyForm && (
        <div onClick={() => setCompanyForm(false)}>
          <CompanyForm setCompanyForm={setCompanyForm} />
        </div>
      )}
    </section>
  );
}

export default WorkList;
