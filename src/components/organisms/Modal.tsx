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
          <div className="flex h-5/6 justify-center items-center">
            <div
              className="bg-white py-4 px-4 md:px-8 rounded-lg drop-shadow-4xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="text-right">
                <button onClick={() => setModal(false)}>
                  <XMarkIcon className="w-6 h-6 text-main-button-color" />
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
