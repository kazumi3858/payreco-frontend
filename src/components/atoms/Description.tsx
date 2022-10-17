import Image from "next/image";

type Props = { position: number };

function Description({ position }: Props) {
  const message = [
    "勤務先情報を登録",
    "合計勤務時間、またはシフトの開始・終了時刻を登録",
    "給料を日本円で自動計算",
  ][position - 1];

  return (
    <div className="mt-12 md:basis-1/3">
      <p className="mb-4 text-5xl font-bold text-sub-button">{position}</p>
      <Image
        className="mx-auto rounded-full md:max-w-full"
        src={
          ["/sub-image1.gif", "/sub-image2.gif", "/sub-image3.png"][
            position - 1
          ]
        }
        alt={`使い方の画像${position}番`}
        width={300}
        height={300}
      />
      <p className="mx-8 py-4 text-sm">{message}</p>
    </div>
  );
}

export default Description;
