import Link from "next/link";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

function Menu() {
  const style = (text: string) =>
    `${text} w-1/3 md:w-1/4 inline-block text-sm md:text-base py-3 px-1 sm:px-3 md:px-5 bg-[#C8DDE0] hover:text-white hover:bg-sub-button-color focus:outline-none focus:ring focus:ring-stone-300`;
  return (
    <div className="sticky bottom-0 cursor-pointer md:bottom-6 md:h-16">
      <div className="text-center">
        <Link href="/">
          <div className={style("md:rounded-l-full")}>
            <CalendarIcon className="mr-2 inline h-6 w-6 pb-1" />
            <a>スケジュール</a>
          </div>
        </Link>
        <Link href="/companies">
          <div className={style("")}>
            <BuildingOfficeIcon className="mr-2 inline h-6 w-6 pb-1" />

            <a>勤務先管理</a>
          </div>
        </Link>
        <Link href="/income">
          <div className={style("md:rounded-r-full")}>
            <CurrencyYenIcon className="mr-2 inline h-6 w-6 pb-1" />
            <a>給料計算</a>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
