import { Company, Work } from "api/model";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  selectedDay: Date;
  selectedCompany: Company;
  setSelectedCompany: Dispatch<SetStateAction<Company | undefined>>;
  work?: Work;
};

function FormModal({
  selectedDay,
  selectedCompany,
  setSelectedCompany,
  work,
}: Props) {
  const selectedYear = selectedDay.getFullYear();
  const selectedMonth = ("0" + (selectedDay.getMonth() + 1)).slice(-2);
  const selectedDate = ("0" + selectedDay.getDate()).slice(-2);
  const nextSelectedDate = ("0" + (selectedDay.getDate() + 1)).slice(-2);
  const formatTime = (date: string, time: string) =>
    `${selectedYear}-${selectedMonth}-${date}T${time}`;
  const minTime = formatTime(selectedDate, "00:00");
  const maxTime = formatTime(selectedDate, "23:59");
  console.log(String(work?.starting_time).substring(11, 16), work?.ending_time);
  const maxTimeNextDay = formatTime(nextSelectedDate, "23:59");
  const defaultTime = (time: Date) =>
    formatTime(selectedDate, String(time).substring(11, 16));
  const pickDurationHours = work?.working_hours
    ? String(Math.floor(work.working_hours))
    : "0";
  const pickDurationMinutes = work?.working_hours
    ? String(
        Math.round(
          (Number(work.working_hours.toFixed(2)) -
            Math.floor(work.working_hours)) *
            60
        )
      )
    : "0";
  const [durationHour, setDurationHour] = useState<string>(pickDurationHours);
  const [durationMinutes, setDurationMinutes] =
    useState<string>(pickDurationMinutes);
  const [payAmount, setPayAmount] = useState<number>(
    work?.pay_amount ? work.pay_amount : 0
  );

  const [startingTime, setStartingTime] = useState<Date>(
    work?.starting_time ? work.starting_time : selectedDay
  );
  const [endingTime, setEndingTime] = useState<Date>(
    work?.ending_time ? work.ending_time : selectedDay
  );
  const [breakTime, setBreakTime] = useState<number>(
    work?.break_time ? work.break_time : 0
  );
  const [memo, setMemo] = useState<string>(work?.memo ? work.memo : "");

  const startAndEndTimeDifference =
    (Date.parse(String(endingTime === undefined ? minTime : endingTime)) -
      Date.parse(String(startingTime === undefined ? minTime : startingTime))) /
      (1000 * 60) -
    (breakTime === undefined ? 0 : breakTime);

  const [shiftMode, setShiftMode] = useState<boolean>(true);
  const changeShiftMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShiftMode(Boolean(e.target.value));
  };
  const workingHours =
    Math.round(
      shiftMode
        ? (startAndEndTimeDifference / 60) * 100
        : (Number(durationHour) + Number(durationMinutes) / 60) * 100
    ) / 100;

  const formData = {
    date: selectedDay,
    company_id: selectedCompany.id,
    starting_time: shiftMode ? startingTime : null,
    ending_time: shiftMode? endingTime : null,
    break_time: shiftMode? breakTime : null,
    working_hours: workingHours,
    pay_amount: selectedCompany.wage_amount
      ? Math.round(selectedCompany.wage_amount * workingHours * 100) / 100
      : payAmount,
    memo: memo,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      date: selectedDay,
      company_id: selectedCompany.id,
      working_hours: workingHours,
      pay_amount: selectedCompany.wage_amount
        ? Math.round(selectedCompany.wage_amount * workingHours * 100) / 100
        : payAmount,
      starting_time: shiftMode ? startingTime : null,
      ending_time: shiftMode? endingTime : null,
      break_time: shiftMode? breakTime : null,
      memo: memo,
    });
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <button
            onClick={() => {
              setSelectedCompany(undefined);
            }}
            className="p-2"
          >
            閉じる
          </button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>勤務先: </label>
              {selectedCompany.name}
            </div>
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
                        ? defaultTime(work.starting_time)
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
                    max={maxTimeNextDay}
                    defaultValue={
                      work?.ending_time
                        ? defaultTime(work.ending_time)
                        : minTime
                    }
                    onChange={(e) => setEndingTime(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <label>休憩: </label>
                  <select
                    defaultValue={work?.break_time ? work.break_time : "0"}
                    onChange={(e) => setBreakTime(Number(e.target.value))}
                  >
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                  </select>
                  分
                </div>
                <p>
                  合計時間:{" "}
                  {`${Math.floor(startAndEndTimeDifference / 60)}時間${
                    startAndEndTimeDifference % 60
                  }分`}
                </p>
              </>
            ) : (
              <div>
                <label>合計時間: </label>
                <select
                  defaultValue={
                    work?.working_hours ? Math.floor(work.working_hours) : 0
                  }
                  onChange={(e) => setDurationHour(e.target.value)}
                >
                  {Object.keys([...Array(24)]).map((num) => {
                    return (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    );
                  })}
                </select>
                時間
                <select
                  defaultValue={
                    work?.working_hours
                      ? Math.round(
                          (Number(work.working_hours.toFixed(2)) -
                            Math.floor(work.working_hours)) *
                            60
                        )
                      : 0
                  }
                  onChange={(e) => setDurationMinutes(e.target.value)}
                >
                  {Object.keys([...Array(60)]).map((num) => {
                    return (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    );
                  })}
                </select>
                分
              </div>
            )}
            <div>
              <label>給料: </label>
              {selectedCompany.wage_amount ? (
                <span>
                  {Math.round(
                    selectedCompany.wage_amount * workingHours * 100
                  ) / 100}
                </span>
              ) : (
                <input
                  className="m-1 w-16"
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                />
              )}
              {selectedCompany.currency_type}
            </div>
            <div>
              <label>メモ: </label>
              <input
                className="m-1"
                defaultValue={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="メモ"
              />
            </div>
            <input className="block m-1 cursor-pointer" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
