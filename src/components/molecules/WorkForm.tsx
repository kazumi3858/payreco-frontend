import { useQueryClient } from "@tanstack/react-query";
import { customMutationResult } from "api/custom-mutation-result";
import { usePatchWorksWorkId, usePostWorks } from "api/default/default";
import { Company, Work } from "api/model";
import SelectBox from "components/atoms/SelectBox";
import { addDays, format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  selectedDay: Date;
  company?: Company;
  setWorkForm: Dispatch<SetStateAction<boolean>>;
  work?: Work;
};

function WorkForm({ selectedDay, company, setWorkForm, work }: Props) {
  const formatTime = (day: Date, time: string) =>
    format(day, `yyyy-MM-dd ${time}`).replace(" ", "T");
  const minTime = formatTime(selectedDay, "00:00");
  const maxTime = formatTime(selectedDay, "23:59");
  const nextDayMaxTime = formatTime(addDays(selectedDay, 1), "23:59");
  const defaultHours = work?.working_hours
    ? String(Math.floor(work.working_hours))
    : "0";
  const defaultMinutes = work?.working_hours
    ? String(
        Math.round(
          (Number(work.working_hours.toFixed(2)) -
            Math.floor(work.working_hours)) *
            60
        )
      )
    : "0";
  const [hours, setHours] = useState<string>(defaultHours);
  const [minutes, setMinutes] = useState<string>(defaultMinutes);
  const [payAmount, setPayAmount] = useState<number>(
    work?.pay_amount ? work.pay_amount : 0
  );
  const [startingTime, setStartingTime] = useState<Date>(
    work?.starting_time ? work.starting_time : selectedDay
  );
  const [endingTime, setEndingTime] = useState<Date>(
    work?.ending_time ? work.ending_time : selectedDay
  );

  const defaultBreakHours = work?.break_time
    ? Math.floor(work.break_time / 60)
    : 0;
  const defaultBreakMinutes = work?.break_time ? work.break_time % 60 : 0;
  const [breakHours, setBreakHours] = useState<number>(defaultBreakHours);
  const [breakMinutes, setBreakMinutes] = useState<number>(defaultBreakMinutes);
  const breakTime = breakHours * 60 + breakMinutes;
  const [memo, setMemo] = useState<string | null>(
    work?.memo ? work.memo : null
  );
  const startAndEndTimeDifference =
    (Date.parse(String(endingTime ? endingTime : minTime)) -
      Date.parse(String(startingTime ? startingTime : minTime))) /
      (1000 * 60) -
    (breakTime ? breakTime : 0);
  const [shiftMode, setShiftMode] = useState<boolean>(true);
  const changeShiftMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShiftMode(Boolean(e.target.value));
  };
  const workingHours =
    Math.round(
      shiftMode
        ? (startAndEndTimeDifference / 60) * 100
        : (Number(hours) + Number(minutes) / 60) * 100
    ) / 100;
  const formData = {
    date: addDays(selectedDay, 1),
    company_id: company?.id,
    starting_time: shiftMode ? startingTime : null,
    ending_time: shiftMode ? endingTime : null,
    break_time: shiftMode ? breakTime : null,
    working_hours: workingHours,
    pay_amount: company?.wage_amount
      ? Math.round(company.wage_amount * workingHours * 100) / 100
      : payAmount,
    memo: memo !== "" ? memo : null,
  };
  const queryClient = useQueryClient();
  const postMutation = usePostWorks();
  const patchMutation = usePatchWorksWorkId();
  const mutationResult = customMutationResult(
    queryClient,
    `/works`,
    setWorkForm
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (workingHours <= 0)
      return alert("合計時間は正の数でなければなりません。");
    if (payAmount > 999999 || payAmount < 0)
      return alert("金額がマイナス・または大きすぎます。");
    work?.id
      ? patchMutation.mutate(
          { workId: work.id, data: formData },
          mutationResult
        )
      : postMutation.mutate({ data: formData }, mutationResult);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <button
            onClick={() => {
              setWorkForm(false);
            }}
            className="p-2"
          >
            閉じる
          </button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>勤務先: </label>
              {company?.name}
            </div>
            <div>
              <input
                className="cursor-pointer"
                type="radio"
                value="true"
                onChange={changeShiftMode}
                checked={shiftMode === true}
              />
              <label>シフト時刻を入力</label>
              <input
                className="cursor-pointer"
                type="radio"
                value=""
                onChange={changeShiftMode}
                checked={shiftMode === false}
              />
              <label>合計勤務時間のみ入力</label>
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
                    array={["0", "1", "2", "3", "4", "5"]}
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
                  <p className="text-rose-600">
                    {Math.sign(startAndEndTimeDifference) === -1 &&
                      `合計時間が正しくありません。`}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <label>合計時間: </label>
                <SelectBox
                  defaultValue={
                    work?.working_hours ? Math.floor(work.working_hours) : 0
                  }
                  changeEvent={(e) => setHours(e.target.value)}
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
                  changeEvent={(e) => setMinutes(e.target.value)}
                  array={Object.keys([...Array(60)])}
                />
                分
              </div>
            )}
            <div>
              <label>給料: </label>
              {company?.wage_amount ? (
                <span>
                  {Math.round(company.wage_amount * workingHours * 100) / 100}
                </span>
              ) : (
                <input
                  className="m-1 w-16"
                  type="number"
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                />
              )}
              {company?.currency_type}
              <p className="text-rose-600">
                {(payAmount > 999999 || payAmount < 0) &&
                  `金額がマイナス・または大きすぎます。`}
              </p>
            </div>
            <div>
              <label>メモ: </label>
              <input
                className="m-1"
                defaultValue={memo ? memo : ""}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="任意入力"
              />
            </div>
            <input className="block m-1 cursor-pointer" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default WorkForm;
