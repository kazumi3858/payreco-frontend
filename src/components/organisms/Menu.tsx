import Link from "next/link";

function Menu() {
  const style = (text: string) =>
    `${text} text-white py-2 lg:py-3 px-5 bg-main-g-r hover:bg-stone-500 active:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300`;
  return (
    <div className="py-5 text-center sticky bottom-5 h-14">
      <div>
        <Link href="/">
          <a className={style("rounded-l-full")}>スケジュール管理</a>
        </Link>
        <Link href="/companies">
          <a className={style("")}>勤務先管理</a>
        </Link>
        <Link href="/income">
          <a className={style("rounded-r-full")}>給料計算</a>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
