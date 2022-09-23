import { MouseEventHandler, useState } from "react";

type Props = {
  logout: MouseEventHandler<HTMLLIElement>;
  visitQuestion: MouseEventHandler<HTMLLIElement>;
};

function Dropdown({ logout, visitQuestion }: Props) {
  const [menu, setMenu] = useState(false);
  const style = "cursor-pointer hover:bg-stone-100 p-3";

  return (
    <div
      onClick={() => setMenu(true)}
      onBlur={() => setMenu(false)}
      tabIndex={0}
      className="relative"
    >
      <div className="py-2 px-5 rounded-full cursor-pointer bg-gradient-to-r from-[#E3E7E5] to-[#9EB2B4] inline absolute top-3 right-3">
        menu
      </div>
      <ul
        className={
          menu
            ? "bg-white rounded-xl drop-shadow-xl inline-block z-50 absolute top-3 right-3"
            : "hidden"
        }
      >
        <li className={style} onClick={logout}>
          ログアウト
        </li>
        <li className={style} onClick={visitQuestion}>
          よくある質問
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
