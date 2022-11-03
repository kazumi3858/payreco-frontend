type Props = { text: string; amount: number };

function PayAmount({ text, amount }: Props) {
  return (
    <div className="mb-6">
      <h2
        className={
          text === "年間合計" ? "mr-2 inline font-bold" : "mb-2 font-bold"
        }
      >
        {text}
      </h2>
      <span className="text-base">{amount.toLocaleString()}</span>
      <span className="ml-1">円</span>
    </div>
  );
}

export default PayAmount;
