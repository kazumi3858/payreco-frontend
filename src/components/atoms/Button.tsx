type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button className="bg-stone-100 py-1 px-2 m-1 rounded-lg" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
