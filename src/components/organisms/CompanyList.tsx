import { useState } from "react";
import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Button from "components/atoms/Button";
import { useGetCompanies } from "api/companies/companies";

function CompapyList() {
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const { data, isLoading } = useGetCompanies();

  return (
    <div className="flex justify-center">
      <div>
        <div className="my-6">
          <h2 className="text-xl inline">勤務先一覧</h2>
          <Button text="新規登録" onClick={() => setCompanyForm(true)} />
        </div>
        <div className="mb-10">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <ul>
              {data?.map((company) => (
                <CompanyDetails key={company.id} company={company} />
              ))}
            </ul>
          )}
        </div>
        {companyForm && <CompanyForm setCompanyForm={setCompanyForm} />}
      </div>
    </div>
  );
}

export default CompapyList;
