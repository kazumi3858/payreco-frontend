type Props = {
  text: number;
  image: number;
};
function Description({ text, image }: Props) {
  const message = [
    "1. 勤務先情報を登録",
    "2. 働いた合計時間、またはシフトの開始・終了時刻を登録",
    "3. 給料を日本円で自動計算",
  ][text];
  const src = [
    "https://user-images.githubusercontent.com/97820517/192142123-597aae0e-9e9e-4d34-a51f-36f30d143c8b.png",
    "https://user-images.githubusercontent.com/97820517/192142151-ccf5d4c1-058e-487b-9e2c-bebe469aeed7.png",
    "https://user-images.githubusercontent.com/97820517/192142205-cb28d363-a79b-47ad-b9b1-bab599a22792.png",
  ][image];

  return (
    <div className="mt-10 w-full">
      <div>
        <img
          className="rounded-full w-72 inline-block"
          src={src}
          alt="main content image"
        />
      </div>
      <p className="my-8">{message}</p>
    </div>
  );
}

export default Description;
