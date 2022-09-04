type Props = {
  type: string;
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

function RadioButton({ type, value, text, onChange, checked }: Props) {
  const smallButtonStyle =
    "cursor-pointer bg-stone-200 rounded-lg p-1" +
    (checked ? " bg-stone-400" : "");
  const bigButtonStyle =
    "cursor-pointer py-2 px-10 bg-stone-200 rounded-full" +
    (checked ? " bg-stone-400" : "");
  const style = type === "small" ? smallButtonStyle : bigButtonStyle;

  return (
    <div className="my-4 inline-block">
      <label className={style}>
        <input
          type="radio"
          className={type === "small" ? "" : "hidden"}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        {text}
      </label>
    </div>
  );
}

export default RadioButton;
