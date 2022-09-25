type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button
      className="bg-main-button-color hover:bg-sub-button-color text-white px-3 m-1 rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
