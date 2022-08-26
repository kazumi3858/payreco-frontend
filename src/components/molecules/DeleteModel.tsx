import { Dispatch, SetStateAction } from "react";

function DeleteModal({
  setDeleteModal,
}: {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <p>本当に削除しますか？</p>
          <button
            onClick={() => {
              setDeleteModal(false);
            }}
            className="p-2"
          >
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
