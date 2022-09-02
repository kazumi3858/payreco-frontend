type Props = {
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

function RadioButton({ value, text, onChange, checked }: Props) {
  return (
    <>
      <label className="cursor-pointer">
        <input
          type="radio"
          value={value}
          onChange={onChange}
          checked={checked}
        />
        {text}
      </label>
    </>
  );
}

export default RadioButton;
