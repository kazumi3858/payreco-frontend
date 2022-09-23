import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Button from "components/atoms/Button";
import Modal from "./Modal";
import Heading from "components/atoms/Heading";
import { useGetCompanies } from "api/companies/companies";
import { useState } from "react";

function CompapyList() {
  const [companyForm, setCompanyForm] = useState(false);
  const { data, isLoading } = useGetCompanies();

  return (
    <div className="flex justify-center">
      <div>
        <div className="mt-6 font-bold">
          <Heading text="勤務先一覧" />
        </div>
        <div className="mb-10">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <div className="bg-white p-3 rounded-3xl">
              <ul>
                {data?.map(
                  (company) =>
                    company.deleted_at === null && (
                      <CompanyDetails key={company.id} company={company} />
                    )
                )}
              </ul>
              <div className="text-center mt-5">
                <Button
                  text="＋勤務先を追加する"
                  onClick={() => setCompanyForm(true)}
                />
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
