import { useQueryClient } from "@tanstack/react-query";
import { useDeleteWorksWorkId } from "api/default/default";
import { customMutationDeleteResult } from "api/custom-mutation-result";

type Props = {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  workId?: string;
};

function DeleteModal({ setDeleteModal, workId }: Props) {
  const queryClient = useQueryClient();
  const mutation = useDeleteWorksWorkId();
  const handleDelete = () => {
    workId &&
      mutation.mutate(
        { workId: workId },
        customMutationDeleteResult(queryClient, `/works`, setDeleteModal)
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
