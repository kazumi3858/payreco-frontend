import IconButton from "components/atoms/IconButton";
import CompanyForm from "components/organisms/CompanyForm";
import DeleteConfirmation from "./DeleteConfirmation";
import Modal from "./Modal";
import { Company } from "api/model";
import { useState } from "react";

type Props = {
  company: Company;
};

function CompanyDetails({ company }: Props) {
  const [companyForm, setCompanyForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <li className="group flex items-center space-x-4 rounded-2xl px-4 py-2 hover:bg-stone-100">
      <div className="flex-1 break-all text-sm">
        <p className="font-bold">{company.name}</p>
        <p>
          {company.hourly_wage_system
            ? `時給${company.wage_amount}${company.currency_type}`
            : `日給制`}
        </p>
      </div>
      <div>
        <IconButton isEditMode onClick={() => setCompanyForm(true)} />
        <IconButton
          isEditMode={false}
          onClick={() => setDeleteConfirmation(true)}
        />
        <Modal modal={companyForm} setModal={setCompanyForm}>
          <CompanyForm company={company} setCompanyForm={setCompanyForm} />
        </Modal>
        <Modal modal={deleteConfirmation} setModal={setDeleteConfirmation}>
          <DeleteConfirmation
            setDeleteConfirmation={setDeleteConfirmation}
            id={company.id}
            queryKey="/companies"
          />
        </Modal>
      </div>
    </li>
  );
}

export default CompanyDetails;
