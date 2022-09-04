import { useState } from "react";
import CompanyForm from "components/organisms/CompanyForm";
import CompanyDetails from "./CompanyDetails";
import Button from "components/atoms/Button";
import { Company } from "api/model";

function CompapyList({ companies }: { companies?: Company[] }) {
  const [companyForm, setCompanyForm] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div>
        <div className="my-6">
          <h2 className="text-xl inline">勤務先一覧</h2>
          <Button text="新規登録" onClick={() => setCompanyForm(true)} />
        </div>
        <div className="mb-10">
          <ul>
            {companies?.map((company) => (
              <CompanyDetails key={company.id} company={company} />
            ))}
          </ul>
        </div>
        {companyForm && <CompanyForm setCompanyForm={setCompanyForm} />}
      </div>
    </div>
  );
}

export default CompapyList;
