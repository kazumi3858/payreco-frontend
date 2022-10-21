import Image from "next/image";

type Props = { position: number };

function Description({ position }: Props) {
  const message = [
    "勤務先情報を登録",
    "合計勤務時間、またはシフトの開始・終了時刻を登録",
    "給料を日本円で自動計算",
  ][position - 1];

  return (
    <div className="px-20 py-4 text-center md:p-10">
      <div className="mb-2">
        <Image
          src={`/step${position}.png`}
          alt={`使い方${position}番`}
          width={60}
          height={60}
        />
      </div>
      <Image
        className="rounded-full"
        src={"/sub-image" + ["1.png", "2.gif", "3.png"][position - 1]}
        alt={`使い方の説明画像${position}番`}
        width={300}
        height={300}
      />
      <p className="mx-8 py-4 text-sm">{message}</p>
    </div>
  );
}

export default Description;
