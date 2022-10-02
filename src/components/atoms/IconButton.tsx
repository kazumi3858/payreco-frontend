import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  edit: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function IconButton({ edit, onClick }: Props) {
  return (
    <button
      title={edit ? "編集" : "削除"}
      className="m-1 rounded-full bg-gray-button hover:bg-stone-200"
      onClick={onClick}
    >
      {edit ? (
        <PencilSquareIcon className="m-2 h-5 w-5 text-[#6e939c]" />
      ) : (
        <TrashIcon className="m-2 h-5 w-5 text-stone-400" />
      )}
    </button>
  );
}

export default IconButton;
