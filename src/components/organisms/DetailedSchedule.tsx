import { format, parseISO } from "date-fns";

function DetailedSchedule({ meeting }: { meeting: any }): JSX.Element {
  const startDateTime = parseISO(meeting.startDatetime);
  const endDateTime = parseISO(meeting.endDatetime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, "h:mm a")}
          </time>
          {" - "}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, "h:mm a")}
          </time>
        </p>
      </div>
    </li>
  );
}

export default DetailedSchedule;
