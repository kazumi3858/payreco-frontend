import { useGetCompanies } from "api/companies/companies";
import { useState } from "react";
import CompanyForm from "components/molecules/CompanyForm";
import DeleteModal from "components/molecules/DeleteModel";
import Company from "./Company";

function CompapyList() {
  const { data } = useGetCompanies();
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  return (
    <div className="flex justify-center">
      <div>
        <div className="my-6">
          <h2 className="text-xl inline">勤務先一覧</h2>
          <button
            className="bg-stone-200 rounded-md"
            onClick={() => {
              setCompanyForm(true);
            }}
          >
            新規登録
          </button>
        </div>
        <div>
          <ul>
            {data?.map((company) => {
              return (
                <li key={company.id}>
                  <Company company={company} />
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
