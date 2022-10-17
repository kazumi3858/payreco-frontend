type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button
      className="m-1 rounded-md bg-main-button py-1 px-3 text-sm hover:bg-sub-button hover:text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
