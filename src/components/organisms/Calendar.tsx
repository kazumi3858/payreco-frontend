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
import { useState } from "react";
import WorkList from "./WorkList";
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

  function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(" ");
  }

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const selectedDayWorks = data?.filter((work) =>
    isSameDay(parseISO(`${work.date}`), selectedDay)
  );

  return (
    <div className="pt-5">
      <div className="max-w-lg mx-auto md:max-w-7xl md:px-6">
        <div className="md:grid md:grid-cols-2">
          <div className="p-6 bg-white rounded-3xl">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={previousMonth}
                className="text-gray-400 hover:text-gray-500"
              >
                <span>{"<"}</span>
              </button>
              <h2 className="text-xl font-bold">
                {format(firstDayCurrentMonth, "yyyy年 MMMM", { locale: ja })}
              </h2>
              <button
                onClick={nextMonth}
                type="button"
                className="text-gray-400 hover:text-gray-500"
              >
                <span>{">"}</span>
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              {dayOfWeek.map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
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
                      "bg-gradient-to-r from-main-g-l to-main-g-r",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-[#D5D8AF]",
                    !isEqual(day, selectedDay) &&
                      "hover:bg-stone-100 cursor-pointer",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "lg:h-20 rounded-md m-1 p-1 text-center"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                  <div className="text-xs mx-auto mt-3 h-6">
                    {data?.some((work) =>
                      isSameDay(parseISO(`${work.date}`), day)
                    ) && <p>●</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <WorkList
            selectedDay={selectedDay}
            selectedDayWorks={selectedDayWorks}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
