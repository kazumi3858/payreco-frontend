type Props = {
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  shape: string;
  padding: string;
};

function RadioButton({
  value,
  text,
  onChange,
  isChecked,
  shape,
  padding,
}: Props) {
  return (
    <div className="my-4 inline-block">
      <label
        className={`cursor-pointer text-sm ${shape} ${padding} ${
          isChecked ? "bg-[#d1dee0]" : "bg-stone-200"
        }`}
      >
        <input
          type="radio"
          className={padding === "py-2 px-4" ? "hidden" : "mr-1"}
          value={value}
          onChange={onChange}
          checked={isChecked}
        />
        {text}
      </label>
    </div>
  );
}

export default RadioButton;
