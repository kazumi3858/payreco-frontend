type Props = {
  position: number;
};

function Description({ position }: Props) {
  const message = [
    "勤務先情報を登録",
    "働いた合計時間、またはシフトの開始・終了時刻を登録",
    "給料を日本円で自動計算",
  ][position - 1];

  return (
    <div className="mt-12">
      <p className="text-[#84a4aa] text-3xl mb-4 font-bold">{position}</p>
      <img
        className="mx-auto rounded-full max-w-xs md:max-w-full"
        src={`sub-image${position}.gif`}
        alt={`使い方の画像${position}番`}
      />

      <p className="my-8">{message}</p>
    </div>
  );
}

export default Description;
