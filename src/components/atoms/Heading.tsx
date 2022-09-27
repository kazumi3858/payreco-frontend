type Props = {
  text: string;
};

function Heading({ text }: Props) {
  return (
    <div className="text-center">
      <h2 className="mb-3 pt-5 text-lg font-bold">{text}</h2>
    </div>
  );
}

export default Heading;
