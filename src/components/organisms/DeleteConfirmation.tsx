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
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteConfirmation({ id, queryKey, setDeleteConfirmation }: Props) {
  const queryClient = useQueryClient();
  const deleteWork = useDeleteWorksWorkId();
  const deleteCompany = useDeleteCompaniesCompanyId();
  const mutationResult = customMutationResult(
    queryClient,
    queryKey,
    setDeleteConfirmation
  );

  const handleDelete = () => {
    queryKey === `/works`
      ? deleteWork.mutate({ workId: id }, mutationResult)
      : deleteCompany.mutate({ companyId: id }, mutationResult);
  };

  return (
    <div className="p-5">
      <p>本当に削除しますか？</p>
      <div className="text-center text-lg font-bold space-x-6 mt-3">
        <button
          className="text-main-button-color hover:brightness-75"
          onClick={handleDelete}
        >
          はい
        </button>
        <button
          className="text-stone-400 hover:brightness-75"
          onClick={() => setDeleteConfirmation(false)}
        >
          いいえ
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
