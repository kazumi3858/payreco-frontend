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
      <div>Menu</div>
      <ul className={menu ? "bg-white inline-block z-50 fixed" : "hidden"}>
        {children}
      </ul>
    </div>
  );
}

export default Dropdown;
