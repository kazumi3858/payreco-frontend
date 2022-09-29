import "@testing-library/jest-dom";
import RadioButton from "components/atoms/RadioButton";
import { render } from "@testing-library/react";

const radioButton = (value: string, text: string, checked: boolean) => (
  <RadioButton
    type="small"
    value={value}
    text={text}
    onChange={jest.fn()}
    checked={checked}
    first={true}
  />
);

describe("RadioButton", () => {
  it("can render radio buttons properly", () => {
    const firstButton = radioButton("one", "radio1", true);
    const secondButton = radioButton("two", "radio2", false);
    const { getByLabelText } = render(
      <>
        {firstButton}
        {secondButton}
      </>
    );
    const firstOption = getByLabelText("radio1") as HTMLInputElement;
    const secondOption = getByLabelText("radio2") as HTMLInputElement;
    expect(firstOption).toBeChecked();
    expect(secondOption).not.toBeChecked();
  });
});
