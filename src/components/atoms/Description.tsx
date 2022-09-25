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
    "https://user-images.githubusercontent.com/97820517/191786764-d6b5f5c3-0c3c-4115-aa10-91f9dbf354a1.png",
    "https://user-images.githubusercontent.com/97820517/191786764-d6b5f5c3-0c3c-4115-aa10-91f9dbf354a1.png",
    "https://user-images.githubusercontent.com/97820517/191786764-d6b5f5c3-0c3c-4115-aa10-91f9dbf354a1.png",
  ][image];

  return (
    <div className="mt-10 w-full">
      <div>
        <img
          className="drop-shadow-2xl rounded-full w-72 inline-block"
          src={src}
          alt="main content image"
        />
      </div>
      <p className="my-8">{message}</p>
    </div>
  );
}

export default Description;
