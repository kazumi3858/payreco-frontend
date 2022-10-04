type Props = {
  text: string;
};

function Heading({ text }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-md mb-3 pt-5 font-bold">{text}</h2>
    </div>
  );
}

export default Heading;
