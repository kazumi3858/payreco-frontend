type Props = { text: string; amount: number };

function PayAmount({ text, amount }: Props) {
  return (
    <div className="mb-6 font-bold">
      <h2 className={text === "年間合計" ? "mr-2 inline" : "mb-2"}>{text}</h2>
      <span className="text-lg">{amount.toLocaleString()}</span>
      <span className="ml-1">円</span>
    </div>
  );
}

export default PayAmount;
