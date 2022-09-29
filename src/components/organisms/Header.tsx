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
    <div className="h-44 w-full bg-gradient-to-l from-stone-100 to-[#C8DDE0]">
      <header className="h-44 w-full bg-gradient-to-t from-stone-100">
        <Dropdown logoutEvent={handleClickLogout} helpEvent={handleClickHelp} />
      </header>
    </div>
  );
}

export default Header;
