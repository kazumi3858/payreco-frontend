import Button from "components/atoms/Button";
import { SetStateAction, useEffect, useRef } from "react";

type Props = {
  children: JSX.Element;
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
};

function Modal({ children, modal, setModal }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    modal && modalRef.current && modalRef.current.focus();
  }, [modal]);

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50" onClick={() => setModal(false)}>
          <div className="flex h-screen justify-center items-center">
            <div
              className="bg-stone-100 p-12 rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button text="閉じる" onClick={() => setModal(false)} />
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
