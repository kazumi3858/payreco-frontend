import Dropdown from "components/atoms/DropDown";
import router from "next/router";
import { useDeleteUsersUserId } from "api/default/default";
import { auth } from "auth/firebase";

function Header() {
  const deleteCurrentUser = useDeleteUsersUserId();
  const handleClickLogout = () => {
    deleteCurrentUser.mutate();
    auth.signOut();
  };
  const handleClickHelp = () => router.push("/questions");

  return (
    <header className="h-10 w-full">
      <Dropdown logoutEvent={handleClickLogout} helpEvent={handleClickHelp} />
    </header>
  );
}

export default Header;
