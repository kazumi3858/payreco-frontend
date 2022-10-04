type Props = {
  updating: boolean;
  disabled?: boolean;
};

function SubmitButton({ updating, disabled }: Props) {
  return (
    <input
      className="m-1 cursor-pointer rounded-md bg-main-button-color px-3 hover:bg-sub-button-color hover:text-white"
      type="submit"
      disabled={disabled}
      value={updating ? "保存中..." : "保存"}
    />
  );
}

export default SubmitButton;
