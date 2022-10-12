import Button from "components/atoms/Button";
import CompanyForm from "components/organisms/CompanyForm";
import WorkForm from "components/organisms/WorkForm";
import Modal from "./Modal";
import WorkDetails from "./WorkDetails";
import Heading from "components/atoms/Heading";
import LoadingIcon from "components/atoms/LoadingIcon";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useGetCompanies } from "api/companies/companies";
import { Company, Work } from "api/model";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  selectedDay: Date;
  selectedDayWorks?: Work[];
};

function WorkList({ selectedDay, selectedDayWorks }: Props) {
  const date = format(selectedDay, "MMM dd日", { locale: ja });

  const { data, isLoading } = useGetCompanies();
  const companies = data?.filter((companies) => companies.deleted_at === null);

  const [isWorkFormOpen, setIsWorkFormOpen] = useState(false);
  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>();

  const companyOfTheWork = (work: Work) =>
    data?.find((company): boolean => company.id === work.company_id)!;

  return (
    <div className="mt-12 md:mt-0 md:pl-14">
      <div className="mb-10 rounded-xl bg-white">
        <Heading text={`${date}の予定`} />
        {isLoading ? (
          <div className="ml-8 pb-5">
            <LoadingIcon />
          </div>
        ) : (
          <ul className="space-y-1 p-3 leading-7 md:text-base md:leading-8">
            {selectedDayWorks && selectedDayWorks.length > 0 ? (
              selectedDayWorks.map((work) => (
                <WorkDetails
                  selectedDay={selectedDay}
                  work={work}
                  key={work.id}
                  company={companyOfTheWork(work)}
                />
              ))
            ) : (
              <p className="py-6 px-3 text-sm">予定はありません。</p>
            )}
          </ul>
        )}
      </div>
      <div className="mb-10 rounded-xl bg-white px-3 pb-5">
        <Heading text={`勤務先を選んで${date}の予定を追加`} />
        {!companies ? (
          <div className="ml-5">
            <LoadingIcon />
          </div>
        ) : (
          <div>
            {companies.length > 0 ? (
              companies.map(
                (company) =>
                  company.deleted_at === null && (
                    <Button
                      key={company.id}
                      text={company.name}
                      onClick={() => {
                        setIsWorkFormOpen(true);
                        setSelectedCompany(company);
                      }}
                    />
                  )
              )
            ) : (
              <p className="mx-5 mb-5 text-sm">
                最初に勤務先を登録してください。勤務先を登録をすると予定を追加できるようになります。
              </p>
            )}

            <button
              className="text-sm hover:text-stone-500"
              onClick={() => setIsCompanyFormOpen(true)}
            >
              <PlusCircleIcon className="ml-3 mr-1 inline h-6 w-6 text-sub-button-color" />
              勤務先を追加する
            </button>
          </div>
        )}
      </div>
      {selectedCompany && (
        <Modal isModalOpen={isWorkFormOpen} setIsModalOpen={setIsWorkFormOpen}>
          <WorkForm
            selectedDay={selectedDay}
            company={selectedCompany}
            setIsFormOpen={setIsWorkFormOpen}
          />
        </Modal>
      )}
      <Modal
        isModalOpen={isCompanyFormOpen}
        setIsModalOpen={setIsCompanyFormOpen}
      >
        <CompanyForm setIsFormOpen={setIsCompanyFormOpen} />
      </Modal>
    </div>
  );
}

export default WorkList;
