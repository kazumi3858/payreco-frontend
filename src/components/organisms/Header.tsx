import { auth } from "auth/firebase";

function Header() {
  return (
    <header className="h-14 bg-stone-200">
      <button onClick={() => auth.signOut()}>サインアウト</button>
    </header>
  );
}

export default Header;
