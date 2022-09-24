type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button
      className="bg-sub-gradient-l text-white px-3 m-1 rounded-2xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
