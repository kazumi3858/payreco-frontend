type Props = {
  isUpdating: boolean;
  isDisabled?: boolean;
  padding: string;
};

function SubmitButton({ isUpdating, isDisabled, padding }: Props) {
  return (
    <input
      className={
        "mt-2 mb-4 cursor-pointer rounded-md bg-main-button py-1 font-bold hover:bg-sub-button hover:text-white " +
        padding
      }
      type="submit"
      disabled={isDisabled}
      value={isUpdating ? "保存中..." : "保存"}
    />
  );
}

export default SubmitButton;
