type Props = {
  small: boolean;
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  first: boolean;
};

function RadioButton({ small, value, text, onChange, checked, first }: Props) {
  return (
    <div className="my-4 inline-block">
      <label
        className={
          (first ? "rounded-l-full " : "rounded-r-full ") +
          (small ? "p-1 " : "py-2 px-4 ") +
          (checked ? "bg-main-button-color" : "bg-stone-200") +
          " cursor-pointer text-sm"
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
