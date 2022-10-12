import RadioButton from "components/atoms/RadioButton";
import SubmitButton from "components/atoms/SubmitButton";
import SelectBox from "components/atoms/SelectBox";
import Label from "components/atoms/Label";
import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import { usePatchWorksWorkId, usePostWorks } from "api/default/default";
import { Company, Work } from "api/model";
import { addDays, format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { ja } from "date-fns/locale";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";

type Props = {
  selectedDay: Date;
  company: Company;
  work?: Work;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
};

function WorkForm({ selectedDay, company, work, setIsFormOpen }: Props) {
  const formatTime = (day: Date, time: string) =>
    format(day, `yyyy-MM-dd ${time}`).replace(" ", "T");
  const minTime = formatTime(selectedDay, "00:00");
  const maxTime = formatTime(selectedDay, "23:59");
  const nextDayMaxTime = formatTime(addDays(selectedDay, 1), "23:59");

  const defaultWorkedHours = work ? Math.floor(work.working_hours) : 0;
  const defaultWorkedMinutes = work
    ? Math.round(
        (Number(work.working_hours.toFixed(2)) -
          Math.floor(work.working_hours)) *
          60
      )
    : 0;
  const defaultBreakHours = work?.break_time
    ? Math.floor(work.break_time / 60)
    : 0;
  const defaultPayAmount = work?.pay_amount || 0;
  const defaultStartingTime = work?.starting_time || selectedDay;
  const defaultEndingTime = work?.ending_time || selectedDay;
  const defaultBreakMinutes = work?.break_time ? work.break_time % 60 : 0;
  const defaultMemo = work?.memo || null;
  const defaultShiftMode = work?.starting_time !== null;

  const [workedHours, setWorkedHours] = useState(defaultWorkedHours);
  const [workedMinutes, setWorkedMinutes] = useState(defaultWorkedMinutes);
  const [payAmount, setPayAmount] = useState(defaultPayAmount);
  const [startingTime, setStartingTime] = useState(defaultStartingTime);
  const [endingTime, setEndingTime] = useState(defaultEndingTime);
  const [breakHours, setBreakHours] = useState(defaultBreakHours);
  const [breakMinutes, setBreakMinutes] = useState(defaultBreakMinutes);
  const [memo, setMemo] = useState(defaultMemo);
  const [isShiftMode, setIsShiftMode] = useState(defaultShiftMode);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const breakTime = breakHours * 60 + breakMinutes;
  const startAndEndTimeDifference =
    (Date.parse(String(endingTime)) - Date.parse(String(startingTime))) /
      (1000 * 60) -
    breakTime;
  const isInvalidHours = Math.sign(startAndEndTimeDifference) === -1;
  const workingHours =
    Math.round(
      isShiftMode
        ? (startAndEndTimeDifference / 60) * 100
        : (workedHours + workedMinutes / 60) * 100
    ) / 100;

  const formData = {
    date: addDays(selectedDay, 1),
    company_id: company.id,
    starting_time: isShiftMode ? startingTime : null,
    ending_time: isShiftMode ? endingTime : null,
    break_time: isShiftMode ? breakTime : null,
    working_hours: workingHours,
    pay_amount: company.wage_amount
      ? Math.round(company.wage_amount * workingHours * 100) / 100
      : payAmount,
    memo: memo || null,
  };

  const queryClient = useQueryClient();
  const postWork = usePostWorks();
  const patchWork = usePatchWorksWorkId();
  const mutationResult = customMutationResult(
    queryClient,
    "/works",
    setIsFormOpen
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = [];
    if (workingHours <= 0) validations.push("合計時間が正しくありません。");
    if (payAmount > 999999 || payAmount < 0)
      validations.push("金額が不正な値・または大きすぎます。");
    if (memo && memo.length > 50)
      validations.push("メモは50文字以内に収めてください。");
    if (validations.length > 0) return alert(validations);

    setIsDisabled(true);
    setIsUpdating(true);

    work
      ? patchWork.mutate({ workId: work.id, data: formData }, mutationResult)
      : postWork.mutate({ data: formData }, mutationResult);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-72 text-center">
        <p className="font-bold">
          {format(selectedDay, "MMMd日", { locale: ja })}の予定
        </p>
        <BuildingOffice2Icon className="mr-1 inline h-4 w-4" />
        <span className="text-sm">{company.name}</span>
      </div>
      <div className="mb-3">
        <RadioButton
          value="true"
          text="シフト時刻を入力"
          onChange={(e) => setIsShiftMode(Boolean(e.target.value))}
          isChecked={isShiftMode}
          shape="rounded-l-full"
          padding="px-2 py-1"
        />
        <RadioButton
          value=""
          text="合計勤務時間を入力"
          onChange={(e) => setIsShiftMode(Boolean(e.target.value))}
          isChecked={!isShiftMode}
          shape="rounded-r-full"
          padding="px-2 py-1"
        />
      </div>
      <div className={isShiftMode ? "" : "hidden"}>
        <div>
          <Label width="w-20" htmlFor="starting-time" title="開始時刻" />
          <input
            id="starting-time"
            type="datetime-local"
            className="mb-5 w-48 rounded-md bg-stone-100 px-1"
            min={minTime}
            max={maxTime}
            defaultValue={
              work?.starting_time
                ? String(work.starting_time).substring(0, 16)
                : minTime
            }
            onChange={(e) => setStartingTime(new Date(e.target.value))}
          />
        </div>
        <div>
          <Label width="w-20" htmlFor="ending-time" title="終了時刻" />
          <input
            id="ending-time"
            type="datetime-local"
            className="mb-5 w-48 rounded-md bg-stone-100 px-1"
            min={minTime}
            max={nextDayMaxTime}
            defaultValue={
              work?.ending_time
                ? String(work.ending_time).substring(0, 16)
                : minTime
            }
            onChange={(e) => setEndingTime(new Date(e.target.value))}
          />
        </div>
        <div>
          <Label width="w-20" title="休憩" />
          <SelectBox
            defaultValue={defaultBreakHours}
            changeEvent={(e) => setBreakHours(Number(e.target.value))}
            array={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
          />
          <span className="mx-2">時間</span>
          <SelectBox
            defaultValue={defaultBreakMinutes}
            changeEvent={(e) => setBreakMinutes(Number(e.target.value))}
            array={Object.keys([...Array(60)])}
          />
          <span className="mx-2">分</span>
        </div>
        <div className="mt-4 mb-2">
          <span className="mr-2 inline-block w-20 text-right font-bold">
            合計時間
          </span>
          <span>
            {`${
              isInvalidHours
                ? Math.ceil(startAndEndTimeDifference / 60)
                : Math.floor(startAndEndTimeDifference / 60)
            }時間${startAndEndTimeDifference % 60}分`}
          </span>
          {isInvalidHours && (
            <p className="text-rose-600">合計時間が正しくありません。</p>
          )}
        </div>
      </div>
      <div className={isShiftMode ? "hidden" : "mb-4"}>
        <Label width="w-20" title="合計時間" />
        <SelectBox
          defaultValue={work ? Math.floor(work.working_hours) : 0}
          changeEvent={(e) => setWorkedHours(Number(e.target.value))}
          array={Object.keys([...Array(24)])}
        />
        <span className="mx-2">時間</span>
        <SelectBox
          defaultValue={
            work
              ? Math.round(
                  (Number(work.working_hours.toFixed(2)) -
                    Math.floor(work.working_hours)) *
                    60
                )
              : 0
          }
          changeEvent={(e) => setWorkedMinutes(Number(e.target.value))}
          array={Object.keys([...Array(60)])}
        />
        <span className="mx-2">分</span>
      </div>

      <div className="mb-2">
        <Label width="w-20" htmlFor="pay" title="給料" />
        {company.wage_amount ? (
          <span>
            {Math.round(company.wage_amount * workingHours * 100) / 100}
          </span>
        ) : (
          <input
            id="pay"
            className="mt-2 mb-3 mr-2 w-28 rounded-md bg-stone-100 px-1"
            type="number"
            placeholder="数値を入力"
            defaultValue={work?.pay_amount || ""}
            onChange={(e) => setPayAmount(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
        )}
        {company.currency_type}
        {(payAmount > 999999 || payAmount < 0) && (
          <p className="text-rose-600">金額が不正な値・または大きすぎます。</p>
        )}
      </div>
      <div>
        <Label width="w-9" htmlFor="memo" title="メモ" />
        <span className="mr-3 text-sm text-dark-blue-color">任意</span>
        <input
          id="memo"
          className="w-48 rounded-md bg-stone-100 px-1"
          defaultValue={memo || ""}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="例: 10時にミーティング"
          onFocus={(e) => e.target.select()}
        />
        {memo && memo.length > 50 && (
          <p className="text-rose-600">メモは50文字以内に収めてください。</p>
        )}
      </div>
      <div className="mt-5 text-right">
        <SubmitButton isUpdating={isUpdating} isDisabled={isDisabled} />
      </div>
    </form>
  );
}

export default WorkForm;
