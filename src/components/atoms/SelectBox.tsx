type Props = {
  defaultValue: number | string;
  changeEvent: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  array: string[];
};

function SelectBox({ defaultValue, changeEvent, array }: Props) {
  return (
    <select
      className="bg-stone-100"
      defaultValue={defaultValue}
      onChange={changeEvent}
    >
      {array.map((element) => (
        <option key={element} value={element}>
          {element}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
