type Props = {
  width: string;
  htmlFor?: string;
  title: string;
};

function Label({ width, htmlFor, title }: Props) {
  return (
    <label
      className={`mr-2 inline-block text-right font-bold ${width}`}
      htmlFor={htmlFor}
    >
      {title}
    </label>
  );
}

export default Label;
