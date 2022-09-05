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

  return (
    <header className="h-14 bg-stone-200">
      <Dropdown>
        <>
          <li className="cursor-pointer" onClick={handleClickLogout}>
            ログアウト
          </li>
          <li className="cursor-pointer" onClick={handleClickQuestion}>
            よくある質問
          </li>
        </>
      </Dropdown>
    </header>
  );
}

export default Header;
