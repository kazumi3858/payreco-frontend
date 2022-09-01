import { Company } from "api/model";
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
      <button
        className="bg-stone-100 p-2 m-1 rounded-md"
        onClick={() => {
          setCompanyForm(true);
        }}
      >
        編集
      </button>
      <button
        className="bg-stone-100 p-2 m-1 rounded-md"
        onClick={() => setDeleteModal(true)}
      >
        削除
      </button>
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
