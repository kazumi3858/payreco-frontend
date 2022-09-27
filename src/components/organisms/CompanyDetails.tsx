import { Company } from "api/model";
import Button from "components/atoms/Button";
import CompanyForm from "components/organisms/CompanyForm";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import Modal from "./Modal";

type Props = {
  company: Company;
};

function CompanyDetails({ company }: Props) {
  const [companyForm, setCompanyForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <li className="group flex items-center space-x-4 rounded-2xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-1">
        <p className="font-bold">{company.name}</p>
        <p>
          {company.hourly_wage_system
            ? `時給${company.wage_amount}${company.currency_type}`
            : `日給制`}
        </p>
      </div>
      <div>
        <Button text="編集" onClick={() => setCompanyForm(true)} />
        <Button text="削除" onClick={() => setDeleteConfirmation(true)} />
        <Modal modal={companyForm} setModal={setCompanyForm}>
          <CompanyForm company={company} setCompanyForm={setCompanyForm} />
        </Modal>
        <Modal modal={deleteConfirmation} setModal={setDeleteConfirmation}>
          <DeleteConfirmation
            setDeleteConfirmation={setDeleteConfirmation}
            id={company.id}
            queryKey={`/companies`}
          />
        </Modal>
      </div>
    </li>
  );
}

export default CompanyDetails;
