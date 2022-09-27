type Props = {
  text: string;
};

function Heading({ text }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-lg mb-3 font-bold pt-5">{text}</h2>
    </div>
  );
}

export default Heading;
