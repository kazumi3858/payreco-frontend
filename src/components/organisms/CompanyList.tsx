import { useGetCompanies } from "api/companies/companies";
import { useState } from "react";
import CompanyForm from "components/molecules/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import DeleteModal from "components/molecules/DeleteModel";
import Button from "components/atoms/Button";

function CompapyList() {
  const { data } = useGetCompanies();
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  return (
    <div className="flex justify-center">
      <div>
        <div className="my-6">
          <h2 className="text-xl inline">勤務先一覧</h2>
          <Button text="新規登録" onClick={() => setCompanyForm(true)} />
        </div>
        <div>
          <ul>
            {data?.map((company) => {
              return (
                <li key={company.id}>
                  <CompanyDetails company={company} />
                </li>
              );
            })}
          </ul>
        </div>
        {companyForm && <CompanyForm setCompanyForm={setCompanyForm} />}
      </div>
    </div>
  );
}

export default CompapyList;
