import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import {
  useDeleteCompaniesCompanyId,
  useDeleteWorksWorkId,
} from "api/default/default";

type Props = {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  queryKey: string;
};

function DeleteModal({ setDeleteModal, id, queryKey }: Props) {
  const queryClient = useQueryClient();
  const deleteWorkMutation = useDeleteWorksWorkId();
  const deleteCompanyMutation = useDeleteCompaniesCompanyId();
  const mutationResult = customMutationResult(
    queryClient,
    queryKey,
    setDeleteModal
  );
  const handleDelete = () => {
    queryKey === `/works`
      ? deleteWorkMutation.mutate({ workId: id }, mutationResult)
      : deleteCompanyMutation.mutate({ companyId: id }, mutationResult);
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <p>本当に削除しますか？</p>
          <button onClick={handleDelete} className="p-2">
            はい
          </button>
          <button
            onClick={() => {
              setDeleteModal(false);
            }}
            className="p-2"
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
