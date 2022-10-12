type Props = {
  text: string;
  amount: number;
};

function PayAmount({ text, amount }: Props) {
  return (
    <div className="mb-6 font-bold">
      {text === "年間合計" ? (
        <h2 className="mr-2 inline">{text}</h2>
      ) : (
        <h2 className="mb-2">{text}</h2>
      )}
      <span className="text-lg text-dark-blue-color">
        {amount.toLocaleString()}
      </span>
      <span className="ml-1">円</span>
    </div>
  );
}

export default PayAmount;
