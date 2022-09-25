import Link from "next/link";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

function Menu() {
  const style = (text: string) =>
    `${text} w-1/3 md:w-1/4 inline-block text-white text-sm md:text-base py-3 px-2 sm:px-3 md:px-5 bg-main-button-color hover:bg-sub-button-color focus:outline-none focus:ring focus:ring-stone-300`;
  return (
    <div className="sticky bottom-0 md:bottom-6 md:h-16 cursor-pointer md:drop-shadow-xl">
      <div className="text-center">
        <Link href="/">
          <div className={style("md:rounded-l-full")}>
            <CalendarIcon className="h-6 w-6 inline mr-2 pb-1" />
            <a>スケジュール</a>
          </div>
        </Link>
        <Link href="/companies">
          <div className={style("")}>
            <BuildingOfficeIcon className="h-6 w-6 inline mr-2 pb-1" />

            <a>勤務先管理</a>
          </div>
        </Link>
        <Link href="/income">
          <div className={style("md:rounded-r-full")}>
            <CurrencyYenIcon className="h-6 w-6 inline mr-2 pb-1" />
            <a>給料計算</a>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
