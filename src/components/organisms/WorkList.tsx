import Button from "components/atoms/Button";
import CompanyForm from "components/organisms/CompanyForm";
import WorkForm from "components/organisms/WorkForm";
import Modal from "./Modal";
import WorkDetails from "./WorkDetails";
import Heading from "components/atoms/Heading";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useGetCompanies } from "api/companies/companies";
import { Company, Work } from "api/model";

type Props = {
  selectedDay: Date;
  selectedDayWorks?: Work[];
};

function WorkList({ selectedDay, selectedDayWorks }: Props) {
  const { data, isLoading } = useGetCompanies();
  const [workForm, setWorkForm] = useState(false);
  const [companyForm, setCompanyForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const company = (work: Work) =>
    data?.find((company): boolean => company.id === work.company_id)!;

  return (
    <div className="mt-12 md:mt-0 md:pl-14 drop-shadow-3xl">
      <div className="mb-10 bg-white rounded-3xl">
        <Heading
          text={`${format(selectedDay, "MMM dd日", { locale: ja })}の予定`}
        />
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <ol className="p-3 space-y-1 md:text-base leading-7 md:leading-8">
            {selectedDayWorks && selectedDayWorks.length > 0 ? (
              selectedDayWorks.map((work) => (
                <WorkDetails
                  selectedDay={selectedDay}
                  work={work}
                  key={work.id}
                  company={company(work)}
                />
              ))
            ) : (
              <p className="py-6 px-3">予定はありません。</p>
            )}
          </ol>
        )}
      </div>
      <div className="mb-10 pb-5 px-3 rounded-3xl bg-white">
        <Heading text="勤務先を選んで予定を追加" />
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <div>
            {data && data.length > 0 ? (
              data.map(
                (company) =>
                  company.deleted_at === null && (
                    <Button
                      key={company.id}
                      text={company.name}
                      onClick={() => {
                        setWorkForm(true);
                        setSelectedCompany(company);
                      }}
                    />
                  )
              )
            ) : (
              <p className="mb-5">
                最初に勤務先を登録してください。勤務先を登録をすると予定を追加できるようになります。
              </p>
            )}
            <Button
              text="＋勤務先を追加する"
              onClick={() => setCompanyForm(true)}
            />
          </div>
        )}
      </div>
      {selectedCompany && (
        <Modal modal={workForm} setModal={setWorkForm}>
          <WorkForm
            selectedDay={selectedDay}
            company={selectedCompany}
            setWorkForm={setWorkForm}
          />
        </Modal>
      )}
      <Modal modal={companyForm} setModal={setCompanyForm}>
        <CompanyForm setCompanyForm={setCompanyForm} />
      </Modal>
    </div>
  );
}

export default WorkList;
