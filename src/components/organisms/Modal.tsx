import { XMarkIcon } from "@heroicons/react/24/solid";
import { SetStateAction } from "react";

type Props = {
  children: JSX.Element;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

function Modal({ children, isModalOpen, setIsModalOpen }: Props) {
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="flex h-full items-center justify-center">
            <div
              className="rounded-xl border border-stone-300 bg-white drop-shadow-4xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="text-right">
                <button onClick={() => setIsModalOpen(false)}>
                  <XMarkIcon className="mt-3 mr-3 h-8 w-8 text-sub-button hover:brightness-75" />
                </button>
              </div>
              <div className="px-6 pb-8 sm:px-14">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
