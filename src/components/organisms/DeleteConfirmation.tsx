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
  setIsConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteConfirmation({ id, queryKey, setIsConfirmationOpen }: Props) {
  const queryClient = useQueryClient();
  const deleteWork = useDeleteWorksWorkId();
  const deleteCompany = useDeleteCompaniesCompanyId();
  const mutationResult = customMutationResult(
    queryClient,
    queryKey,
    setIsConfirmationOpen
  );

  const handleDelete = () => {
    queryKey === "/works"
      ? deleteWork.mutate({ workId: id }, mutationResult)
      : deleteCompany.mutate({ companyId: id }, mutationResult);
  };

  return (
    <div className="p-5 font-bold">
      <p>本当に削除しますか？</p>
      <div className="my-4 flex justify-center">
        <TrashIcon className="h-10 w-10 text-stone-300" />
      </div>
      <div className="mt-3 space-x-6 text-center text-xl">
        <button
          className="text-dark-blue-text hover:brightness-75"
          onClick={handleDelete}
        >
          はい
        </button>
        <button
          className="text-stone-400 hover:brightness-75"
          onClick={() => setIsConfirmationOpen(false)}
        >
          いいえ
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
