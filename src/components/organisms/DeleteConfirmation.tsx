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
    <div>
      <p>本当に削除しますか？</p>
      <Button text="はい" onClick={handleDelete} />
      <Button text="いいえ" onClick={() => setDeleteConfirmation(false)} />
    </div>
  );
}

export default DeleteConfirmation;
