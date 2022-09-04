import Dropdown from "components/atoms/DropDown";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <header className="h-14 bg-stone-200">
      <Dropdown />
    </header>
  );
}

export default Header;
