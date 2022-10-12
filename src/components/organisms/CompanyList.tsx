import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Modal from "./Modal";
import Heading from "components/atoms/Heading";
import LoadingIcon from "components/atoms/LoadingIcon";
import { useGetCompanies } from "api/companies/companies";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

function CompapyList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data } = useGetCompanies();
  const companies = data?.filter((companies) => companies.deleted_at === null);

  return (
    <div className="pt-5">
      <div className="md:max-w-1xl mx-auto max-w-lg px-4 sm:px-7 md:px-6">
        <div className="mb-5 rounded-xl bg-white pb-4">
          <Heading text="勤務先一覧" />
          {!companies ? (
            <div className="ml-5">
              <LoadingIcon />
            </div>
          ) : (
            <div>
              {companies.length > 0 ? (
                <ul className="p-3">
                  {companies.map((company) => (
                    <CompanyDetails key={company.id} company={company} />
                  ))}
                </ul>
              ) : (
                <p className="mx-6 mb-5 text-sm">
                  最初に勤務先を登録してください。勤務先を登録をすると予定を追加できるようになります。
                </p>
              )}
              <div className="my-2 ml-3">
                <button
                  className="text-sm hover:text-stone-500"
                  onClick={() => setIsFormOpen(true)}
                >
                  <PlusCircleIcon className="ml-3 mr-1 inline h-6 w-6 text-sub-button-color" />
                  勤務先を追加する
                </button>
              </div>
            </div>
          )}
        </div>
        <Modal isModalOpen={isFormOpen} setIsModalOpen={setIsFormOpen}>
          <CompanyForm setIsFormOpen={setIsFormOpen} />
        </Modal>
      </div>
    </div>
  );
}

export default CompapyList;
