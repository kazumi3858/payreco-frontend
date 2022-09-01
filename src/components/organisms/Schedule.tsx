import { format, parseISO } from "date-fns";
import { Company, Work } from "api/model";
import { useState } from "react";
import WorkForm from "components/molecules/WorkForm";
import DeleteModal from "components/molecules/DeleteModel";

type Props = {
  work: Work;
  selectedDay: Date;
  company?: Company;
};

function Schedule({ work, selectedDay, company }: Props) {
  const startingTime = parseISO(`${work.starting_time}`);
  const endingTime = parseISO(`${work.ending_time}`);
  const [workForm, setWorkForm] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        <p className="mt-0.5">
          {work.starting_time &&
            `${format(startingTime, "h:mm a")} - ${format(
              endingTime,
              "h:mm a"
            )}`}
          {work.break_time && work.break_time > 0
            ? ` (休憩: ${Math.floor(work.break_time / 60)}時間${
                work.break_time % 60
              }分)`
            : ``}
        </p>
        <p className="text-gray-900">{company?.name}</p>
        <p>
          {`合計勤務: ${work.working_hours}時間 `}
          {`給料: ${work.pay_amount}`}
          {company?.currency_type}
        </p>
        <p>{work.memo && `メモ: ${work.memo}`}</p>
      </div>

      <div className="flex">
        <button
          className="bg-stone-100 p-2 m-1 rounded-md"
          onClick={() => {
            setWorkForm(true);
          }}
        >
          編集
        </button>
        <button
          className="bg-stone-100 p-2 m-1 rounded-md"
          onClick={() => setDeleteModal(true)}
        >
          削除
        </button>
        {workForm && (
          <WorkForm
            selectedDay={selectedDay}
            company={company}
            setWorkForm={setWorkForm}
            work={work}
          />
        )}
        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            id={work.id}
            queryKey={`/works`}
          />
        )}
      </div>
    </li>
  );
}

export default Schedule;
