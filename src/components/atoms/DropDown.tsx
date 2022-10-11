import { Bars3Icon } from "@heroicons/react/24/solid";
import { MouseEventHandler, useState } from "react";

type Props = {
  logoutEvent: MouseEventHandler<HTMLLIElement>;
  helpEvent: MouseEventHandler<HTMLLIElement>;
};

function Dropdown({ logoutEvent, helpEvent }: Props) {
  const [menu, setMenu] = useState(false);
  const style =
    "font-bold text-sm cursor-pointer hover:bg-stone-100 p-3 rounded-xl";

  return (
    <div
      onClick={() => setMenu(true)}
      onBlur={() => setMenu(false)}
      tabIndex={0}
      className="relative"
    >
      <div className="absolute right-3 cursor-pointer py-4 px-4">
        <Bars3Icon className="h-7 w-7" />
      </div>
      <ul
        className={
          menu
            ? "absolute top-3 right-3 z-50 inline-block rounded-xl bg-white p-2 drop-shadow-3xl"
            : "hidden"
        }
      >
        <li className={style} onClick={logoutEvent}>
          ログアウト
        </li>
        <li className={style} onClick={helpEvent}>
          ヘルプ
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
