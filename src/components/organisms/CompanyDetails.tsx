import IconButton from "components/atoms/IconButton";
import CompanyForm from "components/organisms/CompanyForm";
import DeleteConfirmation from "./DeleteConfirmation";
import Modal from "./Modal";
import { Company } from "api/model";
import { useState } from "react";

type Props = { company: Company };

function CompanyDetails({ company }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
        <IconButton isEditMode onClick={() => setIsFormOpen(true)} />
        <IconButton
          isEditMode={false}
          onClick={() => setIsConfirmationOpen(true)}
        />
        <Modal isModalOpen={isFormOpen} setIsModalOpen={setIsFormOpen}>
          <CompanyForm company={company} setIsFormOpen={setIsFormOpen} />
        </Modal>
        <Modal
          isModalOpen={isConfirmationOpen}
          setIsModalOpen={setIsConfirmationOpen}
        >
          <DeleteConfirmation
            setIsConfirmationOpen={setIsConfirmationOpen}
            id={company.id}
            queryKey="/companies"
          />
        </Modal>
      </div>
    </li>
  );
}

export default CompanyDetails;
