type Props = {
  isUpdating: boolean;
  isDisabled?: boolean;
};

function SubmitButton({ isUpdating, isDisabled }: Props) {
  return (
    <input
      className="m-1 cursor-pointer rounded-md bg-main-button px-3 hover:bg-sub-button hover:text-white"
      type="submit"
      disabled={isDisabled}
      value={isUpdating ? "保存中..." : "保存"}
    />
  );
}

export default SubmitButton;
