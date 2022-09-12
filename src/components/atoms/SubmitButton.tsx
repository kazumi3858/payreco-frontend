type Props = {
  updating: boolean;
  disabled?: boolean;
};

function SubmitButton({ updating, disabled }: Props) {
  return (
    <input
      className="m-1 cursor-pointer bg-stone-200 p-1 rounded-md"
      type="submit"
      disabled={disabled}
      value={updating ? "保存中..." : "保存"}
    />
  );
}

export default SubmitButton;
