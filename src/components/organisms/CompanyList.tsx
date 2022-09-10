import { useState } from "react";
import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Button from "components/atoms/Button";
import { useGetCompanies } from "api/companies/companies";
import Modal from "./Modal";
import Heading from "components/atoms/Heading";

function CompapyList() {
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const { data, isLoading } = useGetCompanies();

  return (
    <div className="flex justify-center">
      <div>
        <div className="mt-6">
          <Heading text="勤務先一覧" />
        </div>
        <div className="mb-10">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <ul>
              {data?.map(
                (company) =>
                  company.deleted_at === null && (
                    <CompanyDetails key={company.id} company={company} />
                  )
              )}
            </ul>
          )}
          <Button text="新規登録" onClick={() => setCompanyForm(true)} />
        </div>

        <Modal modal={companyForm} setModal={setCompanyForm}>
          <CompanyForm setCompanyForm={setCompanyForm} />
        </Modal>
      </div>
    </div>
  );
}

export default CompapyList;
