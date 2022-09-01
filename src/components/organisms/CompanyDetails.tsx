import { Company } from "api/model";
import Button from "components/atoms/Button";
import CompanyForm from "components/molecules/CompanyForm";
import DeleteModal from "components/molecules/DeleteModel";
import { useState } from "react";

type Props = {
  company: Company;
};

function CompanyDetails({ company }: Props) {
  const [companyForm, setCompanyForm] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  return (
    <>
      {company.name}
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
    </>
  );
}

export default CompanyDetails;
