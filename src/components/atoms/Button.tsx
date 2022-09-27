type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button
      className="m-1 rounded-lg bg-main-button-color py-1 px-3 text-sm hover:bg-sub-button-color hover:text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
