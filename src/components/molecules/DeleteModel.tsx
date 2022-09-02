import Button from "components/atoms/Button";
import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import {
  useDeleteCompaniesCompanyId,
  useDeleteWorksWorkId,
} from "api/default/default";

type Props = {
  id: string;
  queryKey: string;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteModal({ id, queryKey, setDeleteModal }: Props) {
  const queryClient = useQueryClient();
  const deleteWork = useDeleteWorksWorkId();
  const deleteCompany = useDeleteCompaniesCompanyId();
  const mutationResult = customMutationResult(
    queryClient,
    queryKey,
    setDeleteModal
  );

  const handleDelete = () => {
    queryKey === `/works`
      ? deleteWork.mutate({ workId: id }, mutationResult)
      : deleteCompany.mutate({ companyId: id }, mutationResult);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <p>本当に削除しますか？</p>
          <Button text="はい" onClick={handleDelete} />
          <Button text="いいえ" onClick={() => setDeleteModal(false)} />
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
