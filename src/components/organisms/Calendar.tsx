/**
 * The calendar design was created based on the following URL https://www.youtube.com/watch?v=9ySmMd5Cjc0&t=171s
 */
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
import ja from "date-fns/locale/ja";
import WorkList from "./WorkList";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGetWorks } from "api/works/works";

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

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
    <div className="pt-5">
      <div className="mx-auto max-w-lg px-4 md:max-w-7xl md:px-6">
        <div className="md:grid md:grid-cols-2">
          <div>
            <div className="rounded-xl bg-white p-6 md:mb-10">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span>
                    <PlayIcon className="h-4 w-4 rotate-180 text-sub-button-color hover:brightness-75" />
                  </span>
                </button>
                <h2 className="w-40 text-center text-xl font-bold">
                  {format(firstDayCurrentMonth, "yyyy年 MMMM", { locale: ja })}
                </h2>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span>
                    <PlayIcon className="h-4 w-4 text-sub-button-color hover:brightness-75" />
                  </span>
                </button>
              </div>
              <div className="mt-8 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                {dayOfWeek.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 text-sm">
                {days.map((day, index) => (
                  <div
                    key={day.toString()}
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      index === 0 && colStartClasses[getDay(day)],
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-[#c698ab]",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-main-button-color",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-main-button-color",
                      !isEqual(day, selectedDay) &&
                        "cursor-pointer hover:bg-stone-100",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "m-1 rounded-md p-1 text-center lg:h-16"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                    <div className="mx-auto mt-1 h-4 text-xs md:mt-2">
                      {data?.some((work) =>
                        isSameDay(parseISO(`${work.date}`), day)
                      ) && <p>●</p>}
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
