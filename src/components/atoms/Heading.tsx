type Props = {
  text: string;
};

function Heading({ text }: Props) {
  return <h2 className="text-xl mb-5">{text}</h2>;
}

export default Heading;
