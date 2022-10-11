type Props = {
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  shape: string;
  padding: string;
};

function RadioButton({
  value,
  text,
  onChange,
  checked,
  shape,
  padding,
}: Props) {
  return (
    <div className="my-4 inline-block">
      <label
        className={`cursor-pointer text-sm ${shape} ${padding} ${
          checked ? "bg-[#d1dee0]" : "bg-stone-200"
        }`}
      >
        <input
          type="radio"
          className={padding === "py-2 px-4" ? "hidden" : ""}
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
