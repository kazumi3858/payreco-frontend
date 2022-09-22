import { useDeleteUsersUserId } from "api/default/default";
import { auth } from "auth/firebase";
import Dropdown from "components/atoms/DropDown";
import router from "next/router";

function Header() {
  const logout = useDeleteUsersUserId();
  const handleClickLogout = () => {
    logout.mutate();
    auth.signOut();
  };
  const handleClickQuestion = () => router.push("/questions");

  return (
    <header className="h-14 bg-stone-100">
      <Dropdown
        logout={handleClickLogout}
        visitQuestion={handleClickQuestion}
      />
    </header>
  );
}

export default Header;
