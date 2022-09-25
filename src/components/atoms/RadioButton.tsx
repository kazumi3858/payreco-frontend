type Props = {
  type: string;
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

function RadioButton({ type, value, text, onChange, checked }: Props) {
  const smallButtonStyle = "cursor-pointer rounded-lg p-1";
  const bigButtonStyle = "cursor-pointer py-2 px-10 rounded-full";
  const style = type === "small" ? smallButtonStyle : bigButtonStyle;

  return (
    <div className="my-4 inline-block">
      <label
        className={style + (checked ? " bg-main-gradient-l" : " bg-stone-200")}
      >
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
