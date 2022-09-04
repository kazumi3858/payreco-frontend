import Link from "next/link";

function Menu() {
  return (
    <div className="space-x-10 text-center sticky bottom-0 h-14 bg-zinc-100">
      <Link href="/">
        <a>スケジュール管理</a>
      </Link>
      <Link href="/companies">
        <a>勤務先管理</a>
      </Link>
      <Link href="/income">
        <a>給料計算</a>
      </Link>
    </div>
  );
}

export default Menu;
