import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  edit: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function IconButton({ edit, onClick }: Props) {
  return (
    <button
      title={edit ? "編集" : "削除"}
      className={
        "m-1 rounded-full " +
        (edit
          ? "bg-sub-button-color hover:bg-dark-blue-color"
          : "bg-stone-200 hover:bg-stone-300")
      }
      onClick={onClick}
    >
      {edit ? (
        <PencilSquareIcon className="m-2 h-5 w-5 text-white" />
      ) : (
        <TrashIcon className="m-2 h-5 w-5 text-stone-400" />
      )}
    </button>
  );
}

export default IconButton;
