import Dropdown from "components/atoms/DropDown";
import router from "next/router";
import { useDeleteUsersUserId } from "api/default/default";
import { auth } from "auth/firebase";

function Header() {
  const logout = useDeleteUsersUserId();
  const handleClickLogout = () => {
    logout.mutate();
    auth.signOut();
  };
  const handleClickQuestion = () => router.push("/questions");

  return (
    <div className="w-full bg-gradient-to-r from-main-gradient-l to-main-gradient-r h-44">
      <header className="w-full bg-gradient-to-t from-stone-100 h-44">
        <Dropdown
          logout={handleClickLogout}
          visitQuestion={handleClickQuestion}
        />
      </header>
    </div>
  );
}

export default Header;
