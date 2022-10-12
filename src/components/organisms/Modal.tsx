import { XMarkIcon } from "@heroicons/react/24/solid";
import { SetStateAction } from "react";

type Props = {
  children: JSX.Element;
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
};

function Modal({ children, modal, setModal }: Props) {
  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50" onClick={() => setModal(false)}>
          <div className="flex h-full items-center justify-center">
            <div
              className="rounded-lg bg-white drop-shadow-4xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="text-right">
                <button onClick={() => setModal(false)}>
                  <XMarkIcon className="mt-3 mr-3 h-8 w-8 text-sub-button-color hover:brightness-75" />
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
