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
          <div className="flex h-5/6 items-center justify-center">
            <div
              className="rounded-lg bg-white py-4 px-4 drop-shadow-4xl md:px-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="text-right">
                <button onClick={() => setModal(false)}>
                  <XMarkIcon className="h-6 w-6 text-main-button-color" />
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
