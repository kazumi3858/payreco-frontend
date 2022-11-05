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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
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
        <div className="mb-1 break-all font-bold">{company.name}</div>
        <span className="mt-0.5">
          {work.starting_time &&
            `${format(startingTime, "H:mm")} - ${format(endingTime, "H:mm")}`}
        </span>
        <span>
          {hasBreak && " (休憩 "}
          {hourOfBreak > 0 && `${hourOfBreak}時間`}
          {minuteOfBreak > 0 && `${minuteOfBreak}分`}
          {hasBreak && ")"}
        </span>
        <div className="my-1">
          <ClockIcon className="inline h-4 w-4 text-sub-button" />
          {` ${work.working_hours}時間 `}
          <CurrencyYenIcon className="inline h-4 w-4 text-sub-button" />
          {` ${work.pay_amount.toLocaleString()}${company.currency_type}`}
          {company.currency_type !== "円" &&
            rate > 0 &&
            ` (${Math.floor(work.pay_amount / rate).toLocaleString()}円)`}
        </div>
        {work.memo && (
          <div className="mb-1 break-all">
            <DocumentIcon className="inline h-4 w-4 text-sub-button" />
            <span>{` ${work.memo}`}</span>
          </div>
        )}
      </div>
      <div className="flex">
        <IconButton isEditMode onClick={() => setIsFormOpen(true)} />
        <IconButton
          isEditMode={false}
          onClick={() => setIsConfirmationOpen(true)}
        />
        <Modal isModalOpen={isFormOpen} setIsModalOpen={setIsFormOpen}>
          <WorkForm
            selectedDay={selectedDay}
            company={company}
            setIsFormOpen={setIsFormOpen}
            work={work}
          />
        </Modal>
        <Modal
          isModalOpen={isConfirmationOpen}
          setIsModalOpen={setIsConfirmationOpen}
        >
          <DeleteConfirmation
            setIsConfirmationOpen={setIsConfirmationOpen}
            id={work.id}
            queryKey="/works"
          />
        </Modal>
      </div>
    </li>
  );
}

export default WorkDetails;
