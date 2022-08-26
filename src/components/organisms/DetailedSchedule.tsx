import { format, parseISO } from "date-fns";
import { Work } from "api/model";

function DetailedSchedule({ work }: { work: Work }) {
  const startingTime = parseISO(`${work.starting_time}`);
  const endingTime = parseISO(`${work.ending_time}`);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        {work.starting_time && (
          <p className="mt-0.5">
            {format(startingTime, "h:mm a")} - {format(endingTime, "h:mm a")}
          </p>
        )}
        <p className="text-gray-900">{work.company?.name}</p>
        <p>
          {`合計勤務: ${work.working_hours}時間 `}
          {work.break_time && `(休憩${work.break_time}分)`}
        </p>
        <p>
          {`給料: ${work.pay_amount}`}
          {work.company?.currency_type}
        </p>
        <p>{work.memo && `メモ: ${work.memo}`}</p>
      </div>
    </li>
  );
}

export default DetailedSchedule;
