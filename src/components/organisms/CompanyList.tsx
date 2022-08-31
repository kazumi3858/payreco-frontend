import { useGetCompanies } from "api/companies/companies";
import { Company } from "api/model";
import { useState } from "react";
import CompanyForm from "components/molecules/CompanyForm";

function CompapyList() {
  const { data } = useGetCompanies();
  const [selectedCompany, setSelectedCompany] = useState<Company>();
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
              setSelectedCompany(undefined);
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
                  {company.name}
                  <button
                    className="bg-stone-100 p-2 m-1 rounded-md"
                    onClick={() => {
                      setCompanyForm(true);
                      setSelectedCompany(company);
                    }}
                  >
                    編集
                  </button>
                  <button className="bg-stone-100 p-2 m-1 rounded-md">
                    削除
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {companyForm && (
          <CompanyForm
            setCompanyForm={setCompanyForm}
            company={selectedCompany}
          />
        )}
      </div>
    </div>
  );
}

export default CompapyList;
