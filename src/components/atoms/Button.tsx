type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button
      className="text-sm bg-main-button-color hover:bg-sub-button-color hover:text-white py-1 px-3 m-1 rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
