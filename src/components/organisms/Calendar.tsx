/**
 * The calendar design was created based on the following URL https://www.youtube.com/watch?v=9ySmMd5Cjc0&t=171s
 */

import WorkList from "./WorkList";
import ja from "date-fns/locale/ja";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGetWorks } from "api/works/works";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";

function Calendar() {
  const { data } = useGetWorks();
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const classNames = (...classes: (string | boolean)[]) => {
    return classes.filter(Boolean).join(" ");
  };
  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };
  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };
  const selectedDayWorks = data?.filter((work) =>
    isSameDay(parseISO(`${work.date}`), selectedDay)
  );

  return (
    <div className="px-4 pt-5 pb-10">
      <div className="mx-auto max-w-lg md:max-w-7xl">
        <div className="md:grid md:grid-cols-2">
          <div>
            <div className="rounded-xl border border-stone-300 bg-white p-6 md:mb-10">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span>
                    <PlayIcon className="h-4 w-4 rotate-180 text-sub-button hover:brightness-75" />
                  </span>
                </button>
                <h1 className="text-md w-40 text-center font-bold">
                  {format(firstDayCurrentMonth, "yyyy年 MMMM", { locale: ja })}
                </h1>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span>
                    <PlayIcon className="h-4 w-4 text-sub-button hover:brightness-75" />
                  </span>
                </button>
              </div>
              <div className="mt-2 grid grid-cols-7 text-center text-xs leading-6 text-gray-500 md:mt-8">
                {dayOfWeek.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 text-xs">
                {days.map((day, index) => (
                  <div
                    key={day.toString()}
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      index === 0 && colStartClasses[getDay(day)],
                      isEqual(day, selectedDay),
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-[#EAF0F0]",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && "bg-main-button",
                      !isEqual(day, selectedDay) &&
                        "cursor-pointer hover:bg-stone-100",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "m-1 rounded-lg p-1 text-center lg:h-16"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                    <div className="mx-auto mt-1 h-4 text-xs md:mt-2">
                      {data?.some((work) =>
                        isSameDay(parseISO(`${work.date}`), day)
                      ) && <span>●</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {data && (
            <WorkList
              selectedDay={selectedDay}
              selectedDayWorks={selectedDayWorks}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
