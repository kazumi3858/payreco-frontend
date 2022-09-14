import "@testing-library/jest-dom";
import SelectBox from "components/atoms/SelectBox";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SelectBox", () => {
  const array = ["first option", "second option"];
  const selectBox = (
    <SelectBox
      defaultValue="default text"
      changeEvent={jest.fn()}
      array={array}
    />
  );

  it("has correct amount of options", () => {
    render(selectBox);
    expect(screen.getAllByRole("option").length).toBe(2);
  });

  it("can change value when user chooses new one", () => {
    render(selectBox);
    const selectedOption = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectedOption.value).toBe("first option");
    fireEvent.change(selectedOption, { target: { value: "second option" } });
    expect(selectedOption.value).toBe("second option");
  });
});
