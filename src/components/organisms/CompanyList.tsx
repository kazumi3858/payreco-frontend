import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Modal from "./Modal";
import Heading from "components/atoms/Heading";
import { useGetCompanies } from "api/companies/companies";
import { useState } from "react";
import { PlusSmallIcon } from "@heroicons/react/24/solid";

function CompapyList() {
  const [companyForm, setCompanyForm] = useState(false);
  const { data } = useGetCompanies();
  const companies = data?.filter((companies) => companies.deleted_at === null);

  return (
    <div className="pt-5">
      <div className="md:max-w-1xl mx-auto max-w-lg px-4 sm:px-7 md:px-6">
        <div className="mb-5 rounded-3xl bg-white pb-4">
          <Heading text="勤務先一覧" />
          {!companies ? (
            <p className="ml-5">Loading</p>
          ) : (
            <div>
              {companies.length > 0 ? (
                <ul className="p-3">
                  {companies.map((company) => (
                    <CompanyDetails key={company.id} company={company} />
                  ))}
                </ul>
              ) : (
                <p className="mx-5 mb-5">
                  最初に勤務先を登録してください。勤務先を登録をすると予定を追加できるようになります。
                </p>
              )}
              <div className="mt-5 mb-2 mr-6 text-right">
                <button
                  className="m-1 rounded-lg bg-yellow-button px-3 hover:brightness-90"
                  onClick={() => setCompanyForm(true)}
                >
                  <PlusSmallIcon className="inline h-5 w-5 pb-1" />
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
