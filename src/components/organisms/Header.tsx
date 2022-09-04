import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <header className="h-14 bg-stone-200">
      <Link href="/account">
        <a>マイページ</a>
      </Link>
    </header>
  );
}

export default Header;
