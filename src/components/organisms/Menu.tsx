import Link from "next/link";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

function Menu() {
  const style = (text: string) =>
    `${text} inline-block text-white py-2 lg:py-3 px-5 bg-main-gradient-r hover:bg-stone-500 active:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300`;
  return (
    <div className="py-5 text-center sticky bottom-10 h-14 cursor-pointer">
      <Link href="/">
        <div className={style("rounded-l-full")}>
          <CalendarIcon className="h-6 w-6 inline mr-2 pb-1" />
          <a>スケジュール管理</a>
        </div>
      </Link>
      <Link href="/companies">
        <div className={style("")}>
          <BuildingOfficeIcon className="h-6 w-6 inline mr-2 pb-1" />

          <a>勤務先管理</a>
        </div>
      </Link>
      <Link href="/income">
        <div className={style("rounded-r-full")}>
          <CurrencyYenIcon className="h-6 w-6 inline mr-2 pb-1" />
          <a>給料計算</a>
        </div>
      </Link>
    </div>
  );
}

export default Menu;
