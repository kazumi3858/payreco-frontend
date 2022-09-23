import WorkForm from "components/organisms/WorkForm";
import Button from "components/atoms/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import Modal from "./Modal";
import { format } from "date-fns";
import { Company, Work } from "api/model";
import { useState } from "react";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { findCurrencyRate } from "utils/find-currency-rate";

type Props = {
  work: Work;
  selectedDay: Date;
  company: Company;
};

function WorkDetails({ work, selectedDay, company }: Props) {
  const [workForm, setWorkForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { data } = useGetExchangeRates();
  const startingTime = new Date(`${work.starting_time}`);
  const endingTime = new Date(`${work.ending_time}`);
  const hasBreak = work.break_time !== null && work.break_time > 0;
  const hourOfBreak = work.break_time ? Math.floor(work.break_time / 60) : 0;
  const minuteOfBreak = work.break_time ? work.break_time % 60 : 0;
  const rate = data ? findCurrencyRate(work, company, data) : 0;

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-2xl focus-within:bg-gray-100 hover:bg-stone-100">
      <div className="flex-auto">
        <p className="text-company-t font-bold">{company.name}</p>
        <span className="mt-0.5 font-bold">
          {work.starting_time &&
            `${format(startingTime, "h:mm a")} - ${format(
              endingTime,
              "h:mm a"
            )}`}
        </span>
        <span>
          {hasBreak && " (休憩 "}
          {hourOfBreak > 0 && `${hourOfBreak}時間`}
          {minuteOfBreak > 0 && `${minuteOfBreak}分)`}
        </span>
        <p>
          {`合計勤務: ${work.working_hours}時間 `}
          {`給料: ${work.pay_amount}${company.currency_type}`}
          {company.currency_type !== "円" &&
            rate > 0 &&
            ` (${Math.floor(work.pay_amount / rate)}円)`}
        </p>
        <p>{work.memo && `メモ: ${work.memo}`}</p>
      </div>
      <div className="flex">
        <Button text="編集" onClick={() => setWorkForm(true)} />
        <Button text="削除" onClick={() => setDeleteConfirmation(true)} />
        <Modal modal={workForm} setModal={setWorkForm}>
          <WorkForm
            selectedDay={selectedDay}
            company={company}
            setWorkForm={setWorkForm}
            work={work}
          />
        </Modal>
        <Modal modal={deleteConfirmation} setModal={setDeleteConfirmation}>
          <DeleteConfirmation
            setDeleteConfirmation={setDeleteConfirmation}
            id={work.id}
            queryKey={`/works`}
          />
        </Modal>
      </div>
    </li>
  );
}

export default WorkDetails;
