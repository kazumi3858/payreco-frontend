import { Bars3Icon } from "@heroicons/react/24/solid";
import { MouseEventHandler, useState } from "react";

type Props = {
  logout: MouseEventHandler<HTMLLIElement>;
  visitQuestion: MouseEventHandler<HTMLLIElement>;
};

function Dropdown({ logout, visitQuestion }: Props) {
  const [menu, setMenu] = useState(false);
  const style = "cursor-pointer hover:bg-stone-100 p-3 rounded-xl";

  return (
    <div
      onClick={() => setMenu(true)}
      onBlur={() => setMenu(false)}
      tabIndex={0}
      className="relative"
    >
      <div className="py-4 px-4 cursor-pointer absolute right-3">
        <Bars3Icon className="h-7 w-7" />
      </div>
      <ul
        className={
          menu
            ? "bg-white rounded-xl p-2 drop-shadow-2xl inline-block z-50 absolute top-3 right-3"
            : "hidden"
        }
      >
        <li className={style} onClick={logout}>
          ログアウト
        </li>
        <li className={style} onClick={visitQuestion}>
          ヘルプ
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
