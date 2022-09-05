import { useState } from "react";

type Props = {
  children: JSX.Element;
};

function Dropdown({ children }: Props) {
  const [menu, setMenu] = useState(false);

  return (
    <div
      onClick={() => setMenu(true)}
      onBlur={() => setMenu(false)}
      tabIndex={0}
    >
      <div>メニュー</div>
      <ul
        className={menu ? "bg-white inline-block m-2 p-3 z-50 fixed" : "hidden"}
      >
        {children}
      </ul>
    </div>
  );
}

export default Dropdown;
