import Dropdown from "components/atoms/DropDown";
import router from "next/router";

function Header() {
  const handleClick = () => router.push("/account");

  return (
    <header className="h-14 bg-stone-200">
      <Dropdown>
        <>
          <li className="cursor-pointer" onClick={handleClick}>
            アカウント
          </li>
          <li className="cursor-pointer" onClick={handleClick}>
            よくある質問
          </li>
        </>
      </Dropdown>
    </header>
  );
}

export default Header;
