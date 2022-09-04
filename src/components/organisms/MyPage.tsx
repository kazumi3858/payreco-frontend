import router from "next/router";
import { auth } from "auth/firebase";

function MyPage() {
  return (
    <>
      <h2 className="text-lg">マイページ</h2>
      <button
        onClick={() => {
          auth.signOut();
          router.push("/");
        }}
      >
        サインアウト
      </button>
    </>
  );
}

export default MyPage;
