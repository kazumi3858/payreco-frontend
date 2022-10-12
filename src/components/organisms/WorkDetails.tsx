import IconButton from "components/atoms/IconButton";
import WorkForm from "components/organisms/WorkForm";
import DeleteConfirmation from "./DeleteConfirmation";
import Modal from "./Modal";
import { format } from "date-fns";
import { Company, Work } from "api/model";
import { useState } from "react";
import { useGetExchangeRates } from "api/exchange-rates/exchange-rates";
import { findCurrencyRate } from "utils/find-currency-rate";
import {
  ClockIcon,
  CurrencyYenIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";

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
    <li className="group mb-2 flex items-center space-x-4 rounded-2xl px-4 py-2 hover:bg-stone-100">
      <div className="flex-1 text-sm">
        <div className="break-all font-bold">{company.name}</div>
        <span className="mt-0.5">
          {work.starting_time &&
            `${format(startingTime, "h:mm a")} - ${format(
              endingTime,
              "h:mm a"
            )}`}
        </span>
        <span>
          {hasBreak && " (休憩 "}
          {hourOfBreak > 0 && `${hourOfBreak}時間`}
          {minuteOfBreak > 0 && `${minuteOfBreak}分`}
          {hasBreak && ")"}
        </span>
        <div>
          <ClockIcon className="inline h-4 w-4 text-sub-button-color" />
          {` ${work.working_hours}時間 `}
          <CurrencyYenIcon className="inline h-4 w-4 text-sub-button-color" />
          {` ${work.pay_amount}${company.currency_type}`}
          {company.currency_type !== "円" &&
            rate > 0 &&
            ` (${Math.floor(work.pay_amount / rate)}円)`}
        </div>
        <div className="break-all">
          {work.memo && (
            <>
              <DocumentIcon className="inline h-4 w-4 text-sub-button-color" />
              <span>{` ${work.memo}`}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex">
        <IconButton edit={true} onClick={() => setWorkForm(true)} />
        <IconButton edit={false} onClick={() => setDeleteConfirmation(true)} />
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
            queryKey="/works"
          />
        </Modal>
      </div>
    </li>
  );
}

export default WorkDetails;
