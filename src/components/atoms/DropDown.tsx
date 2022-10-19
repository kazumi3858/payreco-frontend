import { Bars3Icon } from "@heroicons/react/24/solid";
import { MouseEventHandler, useState } from "react";

type Props = {
  logoutEvent: MouseEventHandler<HTMLLIElement>;
  helpEvent: MouseEventHandler<HTMLLIElement>;
};

function Dropdown({ logoutEvent, helpEvent }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const style = "cursor-pointer hover:bg-stone-100 p-3 rounded-xl";

  return (
    <div
      onClick={() => setIsMenuOpen(true)}
      onBlur={() => setIsMenuOpen(false)}
      tabIndex={0}
      className="relative"
    >
      <div className="absolute right-3 cursor-pointer py-4 px-4">
        <Bars3Icon className="h-7 w-7" />
      </div>
      <ul
        className={
          isMenuOpen
            ? "absolute top-3 right-3 z-50 inline-block rounded-xl border border-stone-300 bg-white p-2 text-sm font-bold drop-shadow-3xl"
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
