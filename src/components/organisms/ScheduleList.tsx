import { Work } from "api/model";
import FormModal from "components/molecules/FormModal";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import DetailedSchedule from "./DetailedSchedule";

type Props = {
  selectedDay: Date;
  selectedDayWorks?: Work[];
};

function ScheduleList({ selectedDay, selectedDayWorks }: Props) {
  const [formModal, setFormModal] = useState<boolean>(false);
  return (
    <section className="mt-12 md:mt-0 md:pl-14">
      <span className="font-semibold text-gray-900">
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          {format(selectedDay, "MMM dd日", { locale: ja })}
        </time>
        の予定
      </span>
      <button
        className="m-1 bg-stone-200"
        onClick={() => {
          setFormModal(true);
        }}
      >
        勤務を登録
      </button>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectedDayWorks && selectedDayWorks.length > 0 ? (
          selectedDayWorks.map((work) => (
            <DetailedSchedule
              selectedDay={selectedDay}
              work={work}
              key={work.id}
            />
          ))
        ) : (
          <p>予定はありません。</p>
        )}
      </ol>
      {formModal && (
        <FormModal selectedDay={selectedDay} setFormModal={setFormModal} />
      )}
    </section>
  );
}

export default ScheduleList;
