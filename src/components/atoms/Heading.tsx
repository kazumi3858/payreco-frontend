type Props = { text: string };

function Heading({ text }: Props) {
  return (
    <div className="text-center">
      <h1 className="text-md mb-3 pt-5 font-bold">{text}</h1>
    </div>
  );
}

export default Heading;
