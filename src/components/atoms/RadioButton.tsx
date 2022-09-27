type Props = {
  type: string;
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  first: boolean;
};

function RadioButton({ type, value, text, onChange, checked, first }: Props) {
  const baseStyle = first ? "rounded-l-full" : "rounded-r-full";
  const smallButtonStyle = `cursor-pointer p-1 ${baseStyle}`;
  const bigButtonStyle = `cursor-pointer py-2 px-4 ${baseStyle}`;
  const style = type === "small" ? smallButtonStyle : bigButtonStyle;

  return (
    <div className="my-4 inline-block">
      <label
        className={style + (checked ? " bg-yellow-button" : " bg-stone-200")}
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
