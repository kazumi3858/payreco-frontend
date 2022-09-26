type Props = {
  updating: boolean;
  disabled?: boolean;
};

function SubmitButton({ updating, disabled }: Props) {
  return (
    <input
      className="cursor-pointer bg-main-button-color hover:text-white hover:bg-sub-button-color px-3 m-1 rounded-lg"
      type="submit"
      disabled={disabled}
      value={updating ? "保存中..." : "保存"}
    />
  );
}

export default SubmitButton;
