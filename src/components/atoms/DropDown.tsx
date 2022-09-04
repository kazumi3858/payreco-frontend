import router from "next/router";
import { useEffect, useRef, useState } from "react";

function Dropdown() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    openMenu && menuRef.current && menuRef.current.focus();
  }, [openMenu]);
  const handleClick = () => router.push("/account");

  return (
    <div
      onClick={() => setOpenMenu(!openMenu)}
      ref={menuRef}
      onBlur={() => setOpenMenu(false)}
      tabIndex={0}
    >
      <div>メニュー</div>
      <ul
        className={
          !openMenu ? "hidden" : "bg-white inline-block m-2 p-3 z-50 fixed"
        }
      >
        <li className="cursor-pointer" onClick={handleClick}>
          アカウント
        </li>
        <li className="cursor-pointer" onClick={handleClick}>
          よくある質問
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
