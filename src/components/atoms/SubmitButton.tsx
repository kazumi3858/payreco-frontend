type Props = {
  updating: boolean;
};

function SubmitButton({ updating }: Props) {
  return (
    <input
      className="m-1 cursor-pointer bg-stone-200 p-1 rounded-md"
      type="submit"
      value={updating ? "保存中..." : "保存"}
    />
  );
}

export default SubmitButton;
