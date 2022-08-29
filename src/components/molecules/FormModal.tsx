import { Company, Work } from "api/model";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  selectedDay: Date;
  selectedCompany: Company;
  setSelectedCompany: Dispatch<SetStateAction<Company | null>>;
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
  const [durationHour, setDurationHour] = useState<string>("0");
  const [durationMinutes, setDurationMinutes] = useState<string>("0");
  const [payAmount, setPayAmount] = useState<string>(
    work?.pay_amount ? String(work.pay_amount) : "0"
  );
  const { register, handleSubmit, watch } = useForm<Work>();
  const [inputShift, setInputShift] = useState<string>("yes");
  const [startingTime, endingTime, breakTime] = watch([
    "starting_time",
    "ending_time",
    "break_time",
  ]);
  const workingDuration =
    (Date.parse(String(endingTime === undefined ? minTime : endingTime)) -
      Date.parse(String(startingTime === undefined ? minTime : startingTime))) /
      (1000 * 60) -
    (breakTime === undefined ? 0 : breakTime);
  const workingHours =
    Math.round(
      inputShift === "yes"
        ? (workingDuration / 60) * 100
        : (Number(durationHour) + Number(durationMinutes) / 60) * 100
    ) / 100;
  console.log(work?.company);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputShift(e.target.value);
  };
  const onSubmit: SubmitHandler<Work> = (inputData: Work) => {
    console.log({
      ...inputData,
      ...{
        date: selectedDay,
        working_hours: workingHours,
        company_id: selectedCompany.id,
        pay_amount: selectedCompany.wage_amount
          ? selectedCompany.wage_amount * workingHours
          : Number(payAmount),
      },
    });
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <button
            onClick={() => {
              setSelectedCompany(null);
            }}
            className="p-2"
          >
            閉じる
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>勤務先: </label>
              {selectedCompany.name}
            </div>
            <input
              className="cursor-pointer"
              type="radio"
              value="yes"
              onChange={handleChange}
              checked={inputShift === "yes"}
            />
            <label>シフト時刻を入力</label>
            <input
              className="cursor-pointer"
              type="radio"
              value="no"
              onChange={handleChange}
              checked={inputShift === "no"}
            />
            <label>合計勤務時間のみ入力</label>
            {inputShift === "yes" ? (
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
                    {...register("starting_time")}
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
                    {...register("ending_time")}
                  />
                </div>
                <div>
                  <label>休憩: </label>
                  <select
                    defaultValue={work?.break_time ? work.break_time : "0"}
                    {...register("break_time")}
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
                  {`${Math.floor(workingDuration / 60)}時間${
                    workingDuration % 60
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
                <span>{selectedCompany.wage_amount * workingHours}</span>
              ) : (
                <input
                  className="m-1 w-16"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                />
              )}{selectedCompany.currency_type}
            </div>
            <div>
              <label>メモ: </label>
              <input className="m-1" {...register("memo")} placeholder="メモ" />
            </div>
            <input className="block m-1 cursor-pointer" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
