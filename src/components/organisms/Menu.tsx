import Link from "next/link";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

function Menu() {
  const style =
    "inline-block w-1/3 py-4 text-sm font-bold hover:bg-sub-button-color hover:text-white sm:px-3 md:px-5 md:text-base";

  return (
    <div className="sticky bottom-0 cursor-pointer md:bottom-4 md:h-20">
      <div className="text-center md:flex md:justify-center">
        <div className="bg-gradient-to-r from-main-gradient-l to-main-gradient-r md:w-3/4 md:rounded-full">
          <Link href="/">
            <div className={style + " md:rounded-l-full"}>
              <CalendarIcon className="mr-2 inline h-6 w-6 pb-1" />
              <a>スケジュール</a>
            </div>
          </Link>
          <Link href="/companies">
            <div className={style}>
              <BuildingOfficeIcon className="mr-2 inline h-6 w-6 pb-1" />
              <a>勤務先管理</a>
            </div>
          </Link>
          <Link href="/income">
            <div className={style + " md:rounded-r-full"}>
              <CurrencyYenIcon className="mr-2 inline h-6 w-6 pb-1" />
              <a>給料計算</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
