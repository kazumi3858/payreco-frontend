import { format, parseISO } from "date-fns";
import { Company, Work } from "api/model";
import { useState } from "react";
import FormModal from "components/molecules/FormModal";
import DeleteModal from "components/molecules/DeleteModel";

type Props = {
  work: Work;
  selectedDay: Date;
  company?: Company;
};

function DetailedSchedule({ work, selectedDay, company }: Props) {
  const startingTime = parseISO(`${work.starting_time}`);
  const endingTime = parseISO(`${work.ending_time}`);
  const [modal, setModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        {work.starting_time && (
          <p className="mt-0.5">
            {format(startingTime, "h:mm a")} - {format(endingTime, "h:mm a")}
          </p>
        )}
        <p className="text-gray-900">{company?.name}</p>
        <p>
          {`合計勤務: ${work.working_hours}時間 `}
          {work.break_time && `(休憩${work.break_time}分)`}
        </p>
        <p>
          {`給料: ${work.pay_amount}`}
          {company?.currency_type}
        </p>
        <p>{work.memo && `メモ: ${work.memo}`}</p>
      </div>

      <div className="flex">
        <button
          className="bg-stone-100 p-2 m-1 rounded-md"
          onClick={() => {
            setModal(true);
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
        {modal && (
          <FormModal
            selectedDay={selectedDay}
            company={company}
            setModal={setModal}
            work={work}
          />
        )}
        {deleteModal && (
          <DeleteModal setDeleteModal={setDeleteModal} workId={work.id} />
        )}
      </div>
    </li>
  );
}

export default DetailedSchedule;
