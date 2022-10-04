type Props = {
  small: boolean;
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  first: boolean;
};

function RadioButton({ small, value, text, onChange, checked, first }: Props) {
  const roundStyle = first ? "rounded-l-full" : "rounded-r-full";
  const smallButtonStyle = "cursor-pointer p-1 " + roundStyle;
  const bigButtonStyle = "cursor-pointer py-2 px-4 " + roundStyle;

  return (
    <div className="my-4 inline-block">
      <label
        className={
          (small ? smallButtonStyle : bigButtonStyle) +
          (checked ? " bg-main-button-color" : " bg-stone-200")
        }
      >
        <input
          type="radio"
          className={small ? "" : "hidden"}
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
