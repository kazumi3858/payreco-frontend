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
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

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
        <div>
          <Button text="編集" onClick={() => setCompanyForm(true)} />
          <Button text="削除" onClick={() => setDeleteConfirmation(true)} />
        </div>

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
