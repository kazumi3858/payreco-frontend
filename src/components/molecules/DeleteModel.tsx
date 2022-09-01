import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteCompaniesCompanyId,
  useDeleteWorksWorkId,
} from "api/default/default";
import { customMutationResult } from "api/custom-mutation-result";

type Props = {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  queryKey: string;
};

function DeleteModal({ setDeleteModal, id, queryKey }: Props) {
  const queryClient = useQueryClient();
  const deleteWorkMutation = useDeleteWorksWorkId();
  const deleteCompanyMutation = useDeleteCompaniesCompanyId();
  const handleDelete = () => {
    queryKey === `/works`
      ? deleteWorkMutation.mutate(
          { workId: id },
          customMutationResult(queryClient, queryKey, setDeleteModal)
        )
      : deleteCompanyMutation.mutate(
          { companyId: id },
          customMutationResult(queryClient, queryKey, setDeleteModal)
        );
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
