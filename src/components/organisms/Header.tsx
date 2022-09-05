import { useDeleteUsersUserId } from "api/default/default";
import { auth } from "auth/firebase";
import Dropdown from "components/atoms/DropDown";
import router from "next/router";

function Header() {
  const logout = useDeleteUsersUserId();
  const handleClickLogout = () => {
    logout.mutate();
    auth.signOut();
    router.push("/");
  };
  const handleClickQuestion = () => router.push("/questions");

  const style = "cursor-pointer hover:bg-stone-100 p-3";

  return (
    <header className="h-14 bg-stone-200">
      <Dropdown>
        <>
          <li className={style} onClick={handleClickLogout}>
            ログアウト
          </li>
          <li className={style} onClick={handleClickQuestion}>
            よくある質問
          </li>
        </>
      </Dropdown>
    </header>
  );
}

export default Header;
