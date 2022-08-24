import { format, parseISO } from "date-fns";
import { Work } from "api/model";

function DetailedSchedule({ work }: { work: Work }) {
  const startDateTime = parseISO(`${work.starting_time}`);
  const endDateTime = parseISO(`${work.ending_time}`);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        <p className="text-gray-900">{work.company_id}</p>
        <p className="mt-0.5">
          <time dateTime={`${work.starting_time}`}>
            {format(startDateTime, "h:mm a")}
          </time>
          {" - "}
          <time dateTime={`${work.ending_time}`}>
            {format(endDateTime, "h:mm a")}
          </time>
        </p>
      </div>
    </li>
  );
}

export default DetailedSchedule;
