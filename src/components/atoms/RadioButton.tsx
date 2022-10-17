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
        className={`block cursor-pointer text-sm font-bold ${shape} ${padding} ${
          isChecked ? "bg-[#d1dee0]" : "bg-stone-200 text-stone-400"
        }`}
      >
        <input
          type="radio"
          className="hidden"
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
