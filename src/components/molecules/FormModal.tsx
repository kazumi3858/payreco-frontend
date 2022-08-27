import { useGetCompanies } from "api/companies/companies";
import { Work } from "api/model";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  selectedDay: Date;
  setFormModal: Dispatch<SetStateAction<boolean>>;
  work?: Work;
};

function FormModal({ selectedDay, setFormModal, work }: Props) {
  const { data } = useGetCompanies();
  const { register, handleSubmit } = useForm<Work>();
  const selectedYear = selectedDay.getFullYear();
  const selectedMonth = ("0" + (selectedDay.getMonth() + 1)).slice(-2);
  const selectedDate = ("0" + selectedDay.getDate()).slice(-2);
  const nextSelectedDate = ("0" + (selectedDay.getDate() + 1)).slice(-2);
  const minTime = `${selectedYear}-${selectedMonth}-${selectedDate}T00:00`;
  const maxTime = `${selectedYear}-${selectedMonth}-${selectedDate}T23:59`;
  const maxTimeNextDay = `${selectedYear}-${selectedMonth}-${nextSelectedDate}T23:59`;
  const [inputShift, setInputShift] = useState<string>("shift");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputShift(e.target.value);
  };
  const onSubmit: SubmitHandler<Work> = (inputData: Work) => {
    console.log({ ...inputData, ...{ date: selectedDay } });
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-stone-100 p-12 rounded-xl ">
          <button
            onClick={() => {
              setFormModal(false);
            }}
            className="p-2"
          >
            閉じる
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>勤務先: </label>
              {data?.map((company) => {
                return (
                  <div key={company.id}>
                    <input
                      className="sr-only peer"
                      type="radio"
                      value={company.id}
                      id={company.id}
                      {...register("company_id")}
                    />
                    <label
                      className="flex cursor-pointer peer-checked:bg-green-200"
                      htmlFor={company.id}
                    >
                      {company.name}
                    </label>
                  </div>
                );
              })}
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
                    <option value="60">90</option>
                    <option value="60">120</option>
                  </select>
                  分
                </div>
              </>
            ) : (
              <div>
                <label>合計時間: </label>
                <input className="m-1 w-10" {...register("working_hours")} />
                時間
                <input className="m-1 w-10" {...register("working_hours")} />分
              </div>
            )}
            {!work?.company?.hourly_wage_system && (
              <div>
                <label>給料: </label>
                <input
                  className="m-1"
                  {...register("pay_amount")}
                  placeholder="11000"
                />
              </div>
            )}
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
