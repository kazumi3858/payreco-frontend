type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return (
    <button className="bg-stone-100 p-2 m-1 rounded-md" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
