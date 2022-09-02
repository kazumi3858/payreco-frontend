type Props = {
  value: string;
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

function RadioButton({ value, text, onChange, checked }: Props) {
  return (
    <>
      <input
        className="cursor-pointer"
        type="radio"
        id="option"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor="option">{text}</label>
    </>
  );
}

export default RadioButton;
