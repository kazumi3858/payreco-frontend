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
      <div className="cursor-pointer bg-stone-300 inline absolute top-0 right-0">
        Menu
      </div>
      <ul
        className={
          menu ? "bg-white inline-block z-50 absolute top-0 right-0" : "hidden"
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
