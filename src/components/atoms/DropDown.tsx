import { useEffect, useRef, useState } from "react";

type Props = {
  children: JSX.Element;
};

function Dropdown({ children }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    openMenu && menuRef.current && menuRef.current.focus();
  }, [openMenu]);

  return (
    <div
      onClick={() => setOpenMenu(!openMenu)}
      onBlur={() => setOpenMenu(false)}
      ref={menuRef}
      tabIndex={0}
    >
      <div>メニュー</div>
      <ul
        className={
          openMenu ? "bg-white inline-block m-2 p-3 z-50 fixed" : "hidden"
        }
      >
        {children}
      </ul>
    </div>
  );
}

export default Dropdown;
