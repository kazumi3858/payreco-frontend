import { Company } from "api/model";
import Button from "components/atoms/Button";
import CompanyForm from "components/organisms/CompanyForm";
import { useState } from "react";
import DeleteModal from "./DeleteModel";

type Props = {
  company: Company;
};

function CompanyDetails({ company }: Props) {
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        <p>{company.name}</p>
        <p>
          {company.hourly_wage_system
            ? `時給${company.wage_amount}${company.currency_type}`
            : `日給制`}
        </p>
      </div>
      <div>
        <Button text="編集" onClick={() => setCompanyForm(true)} />
        <Button text="削除" onClick={() => setDeleteModal(true)} />
        {companyForm && (
          <CompanyForm company={company} setCompanyForm={setCompanyForm} />
        )}
        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            id={company.id}
            queryKey={`/companies`}
          />
        )}
      </div>
    </li>
  );
}

export default CompanyDetails;
