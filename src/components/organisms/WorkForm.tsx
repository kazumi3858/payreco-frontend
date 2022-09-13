import RadioButton from "components/atoms/RadioButton";
import SubmitButton from "components/atoms/SubmitButton";
import SelectBox from "components/atoms/SelectBox";
import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import { usePatchWorksWorkId, usePostWorks } from "api/default/default";
import { Company, Work } from "api/model";
import { addDays, format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  selectedDay: Date;
  company: Company;
  work?: Work;
  setWorkForm: Dispatch<SetStateAction<boolean>>;
};

function WorkForm({ selectedDay, company, work, setWorkForm }: Props) {
  const formatTime = (day: Date, time: string) =>
    format(day, `yyyy-MM-dd ${time}`).replace(" ", "T");
  const minTime = formatTime(selectedDay, "00:00");
  const maxTime = formatTime(selectedDay, "23:59");
  const nextDayMaxTime = formatTime(addDays(selectedDay, 1), "23:59");

  const defaultWorkedHours = work?.working_hours
    ? String(Math.floor(work.working_hours))
    : "0";
  const defaultWorkedMinutes = work?.working_hours
    ? String(
        Math.round(
          (Number(work.working_hours.toFixed(2)) -
            Math.floor(work.working_hours)) *
            60
        )
      )
    : "0";
  const defaultBreakHours = work?.break_time
    ? Math.floor(work.break_time / 60)
    : 0;
  const defaultPayAmount = work ? work.pay_amount : 0;
  const defaultStartingTime = work?.starting_time
    ? work.starting_time
    : selectedDay;
  const defaultEndingTime = work?.ending_time ? work.ending_time : selectedDay;
  const defaultBreakMinutes = work?.break_time ? work.break_time % 60 : 0;
  const defaultMemo = work?.memo ? work.memo : null;
  const defaultShiftMode = work?.starting_time !== null;

  const [workedHours, setWorkedHours] = useState<string>(defaultWorkedHours);
  const [workedMinutes, setWorkedMinutes] =
    useState<string>(defaultWorkedMinutes);
  const [payAmount, setPayAmount] = useState<number>(defaultPayAmount);
  const [startingTime, setStartingTime] = useState<Date>(defaultStartingTime);
  const [endingTime, setEndingTime] = useState<Date>(defaultEndingTime);
  const [breakHours, setBreakHours] = useState<number>(defaultBreakHours);
  const [breakMinutes, setBreakMinutes] = useState<number>(defaultBreakMinutes);
  const [memo, setMemo] = useState<string | null>(defaultMemo);
  const [shiftMode, setShiftMode] = useState<boolean>(defaultShiftMode);

  const [updating, setUpdating] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const breakTime = breakHours * 60 + breakMinutes;
  const startAndEndTimeDifference =
    (Date.parse(String(endingTime ? endingTime : minTime)) -
      Date.parse(String(startingTime ? startingTime : minTime))) /
      (1000 * 60) -
    (breakTime ? breakTime : 0);
  const changeShiftMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShiftMode(Boolean(e.target.value));
  };
  const workingHours =
    Math.round(
      shiftMode
        ? (startAndEndTimeDifference / 60) * 100
        : (Number(workedHours) + Number(workedMinutes) / 60) * 100
    ) / 100;

  const formData = {
    date: addDays(selectedDay, 1),
    company_id: company.id,
    starting_time: shiftMode ? startingTime : null,
    ending_time: shiftMode ? endingTime : null,
    break_time: shiftMode ? breakTime : null,
    working_hours: workingHours,
    pay_amount: company.wage_amount
      ? Math.round(company.wage_amount * workingHours * 100) / 100
      : payAmount,
    memo: memo !== "" ? memo : null,
  };

  const queryClient = useQueryClient();
  const postWork = usePostWorks();
  const patchWork = usePatchWorksWorkId();
  const mutationResult = customMutationResult(
    queryClient,
    `/works`,
    setWorkForm
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = [];
    if (workingHours <= 0)
      validation.push("合計時間は正の数でなければなりません。");
    if (payAmount > 999999 || payAmount < 0)
      validation.push("金額がマイナス・または大きすぎます。");
    if (memo && memo.length > 50)
      validation.push(`メモを50文字以内に収めてください。`);
    if (validation.length > 0) return alert(validation);

    setDisableButton(true);
    setUpdating(true);

    work?.id
      ? patchWork.mutate({ workId: work.id, data: formData }, mutationResult)
      : postWork.mutate({ data: formData }, mutationResult);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>勤務先: </label>
        {company.name}
      </div>
      <div className="space-x-1">
        <RadioButton
          type="small"
          value="true"
          text="シフト時刻を入力"
          onChange={changeShiftMode}
          checked={shiftMode}
        />
        <RadioButton
          type="small"
          value=""
          text="合計勤務時間のみ入力"
          onChange={changeShiftMode}
          checked={!shiftMode}
        />
      </div>
      {shiftMode ? (
        <>
          <div>
            <label>開始時刻: </label>
            <input
              type="datetime-local"
              className="block"
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
            <label>終了時刻: </label>
            <input
              type="datetime-local"
              className="block"
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
            <label>休憩: </label>
            <SelectBox
              defaultValue={defaultBreakHours}
              changeEvent={(e) => setBreakHours(Number(e.target.value))}
              array={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
            />
            時間
            <SelectBox
              defaultValue={defaultBreakMinutes}
              changeEvent={(e) => setBreakMinutes(Number(e.target.value))}
              array={Object.keys([...Array(60)])}
            />
            分
          </div>
          <div>
            <p>
              合計時間:{" "}
              {`${Math.floor(startAndEndTimeDifference / 60)}時間${
                startAndEndTimeDifference % 60
              }分`}
            </p>
            {Math.sign(startAndEndTimeDifference) === -1 && (
              <p className="text-rose-600">合計時間が正しくありません。</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <label>合計時間: </label>
          <SelectBox
            defaultValue={
              work?.working_hours ? Math.floor(work.working_hours) : 0
            }
            changeEvent={(e) => setWorkedHours(e.target.value)}
            array={Object.keys([...Array(24)])}
          />
          時間
          <SelectBox
            defaultValue={
              work?.working_hours
                ? Math.round(
                    (Number(work.working_hours.toFixed(2)) -
                      Math.floor(work.working_hours)) *
                      60
                  )
                : 0
            }
            changeEvent={(e) => setWorkedMinutes(e.target.value)}
            array={Object.keys([...Array(60)])}
          />
          分
        </div>
      )}
      <div>
        <label>給料: </label>
        {company.wage_amount ? (
          <span>
            {Math.round(company.wage_amount * workingHours * 100) / 100}
          </span>
        ) : (
          <input
            className="m-1 w-16"
            type="number"
            defaultValue={work?.pay_amount ? work?.pay_amount : ""}
            onChange={(e) => setPayAmount(Number(e.target.value))}
          />
        )}
        {company.currency_type}
        {(payAmount > 999999 || payAmount < 0) && (
          <p className="text-rose-600">金額がマイナス・または大きすぎます。</p>
        )}
      </div>
      <div>
        <label>メモ: </label>
        <input
          className="m-1"
          defaultValue={memo ? memo : ""}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="任意入力"
          onFocus={(e) => e.target.select()}
        />
        {memo && memo.length > 50 && (
          <p className="text-rose-600">メモを50文字以内に収めてください。</p>
        )}
      </div>
      <SubmitButton updating={updating} disabled={disableButton} />
    </form>
  );
}

export default WorkForm;
