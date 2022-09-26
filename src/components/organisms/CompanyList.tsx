import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Modal from "./Modal";
import Heading from "components/atoms/Heading";
import { useGetCompanies } from "api/companies/companies";
import { useState } from "react";
import { PlusSmallIcon } from "@heroicons/react/24/solid";

function CompapyList() {
  const [companyForm, setCompanyForm] = useState(false);
  const { data, isLoading } = useGetCompanies();

  return (
    <div className="pt-5">
      <div className="max-w-lg px-4 mx-auto sm:px-7 md:max-w-1xl md:px-6">
        <div className="mb-5 bg-white rounded-3xl pb-4">
          <Heading text="勤務先一覧" />
          {isLoading ? (
            <p className="ml-5">Loading</p>
          ) : (
            <div>
              <ul className="p-3">
                {data?.map(
                  (company) =>
                    company.deleted_at === null && (
                      <CompanyDetails key={company.id} company={company} />
                    )
                )}
              </ul>
              <div className="text-right mt-5 mb-2 mr-6">
                <button
                  className="bg-yellow-button hover:bg-stone-300 rounded-lg px-3 m-1"
                  onClick={() => setCompanyForm(true)}
                >
                  <PlusSmallIcon className="h-5 w-5 inline pb-1" />
                  勤務先を追加する
                </button>
              </div>
            </div>
          )}
        </div>
        <Modal modal={companyForm} setModal={setCompanyForm}>
          <CompanyForm setCompanyForm={setCompanyForm} />
        </Modal>
      </div>
    </div>
  );
}

export default CompapyList;
