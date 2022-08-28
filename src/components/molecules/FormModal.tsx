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
  const minTime = `${selectedYear}-${selectedMonth}-${selectedDate}T00:00`;
  const maxTime = `${selectedYear}-${selectedMonth}-${selectedDate}T23:59`;
  const maxTimeNextDay = `${selectedYear}-${selectedMonth}-${nextSelectedDate}T23:59`;
  const [durationHour, setDurationHour] = useState<string>("0");
  const [durationMinutes, setDurationMinutes] = useState<string>("0");
  const { register, handleSubmit, watch } = useForm<Work>();
  const [inputShift, setInputShift] = useState<string>("shift");
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
    inputShift === "shift"
      ? Math.round((workingDuration / 60) * 100) / 100
      : Math.round(
          (Number(durationHour) + Number(durationMinutes) / 60) * 100
        ) / 100;
  console.log(workingHours);
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
              value="shift"
              onChange={handleChange}
              checked={inputShift === "shift"}
            />
            <label>シフト時刻を入力</label>
            <input
              className="cursor-pointer"
              type="radio"
              value="noShift"
              onChange={handleChange}
              checked={inputShift === "noShift"}
            />
            <label>合計勤務時間のみ入力</label>
            {inputShift === "shift" ? (
              <>
                <div>
                  <label>開始時刻: </label>
                  <input
                    type="datetime-local"
                    className="block"
                    min={minTime}
                    max={maxTime}
                    defaultValue={minTime}
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
                    defaultValue={minTime}
                    {...register("ending_time")}
                  />
                </div>
                <div>
                  <label>休憩: </label>
                  <select {...register("break_time")}>
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
                  value={durationHour}
                  onChange={(e) => setDurationHour(e.target.value)}
                >
                  {Object.keys([...Array(24)]).map((num) => {
                    return <option value={num}>{num}</option>;
                  })}
                </select>
                時間
                <select
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                >
                  {Object.keys([...Array(60)]).map((num) => {
                    return <option value={num}>{num}</option>;
                  })}
                </select>
                分
              </div>
            )}
            <div>
              <label>給料: </label>
              {work?.company?.wage_amount ? (
                work?.company?.wage_amount * workingHours
              ) : (
                <input
                  className="m-1 w-16"
                  {...register("pay_amount")}
                  placeholder="11000"
                />
              )}
              {work?.company?.currency_type}
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
