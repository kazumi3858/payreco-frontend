import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import { TrashIcon } from "@heroicons/react/24/solid";
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
      <div className="my-4 flex justify-center">
        <TrashIcon className="h-10 w-10 text-stone-300" />
      </div>
      <div className="mt-3 space-x-6 text-center text-xl font-bold">
        <button
          className="text-dark-blue-color hover:brightness-75"
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
