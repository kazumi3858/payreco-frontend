import { Dispatch, SetStateAction } from "react";

function FormModal({
  setFormModal,
}: {
  setFormModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <button
            onClick={() => {
              setFormModal(false);
            }}
            className="p-2"
          >
            閉じる
          </button>
          <p>ここにフォーム</p>
          <button
            onClick={() => {
              setFormModal(false);
            }}
            className="p-2"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
