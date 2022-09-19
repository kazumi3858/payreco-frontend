import "@testing-library/jest-dom";
import Modal from "components/organisms/Modal";
import { render, screen } from "@testing-library/react";
import { useState as useStateMock } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const setState = jest.fn();

describe("Modal", () => {
  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
  });

  it("should not render modal when user has not opened", async () => {
    const [modal, setModal] = useStateMock(false);
    render(
      <Modal modal={modal} setModal={setModal}>
        <p>children</p>
      </Modal>
    );
    expect(screen.queryByText("children")).toBeNull();
  });

  it("can render modal when user open", async () => {
    const [modal, setModal] = useStateMock(true);
    render(
      <Modal modal={modal} setModal={setModal}>
        <p>children</p>
      </Modal>
    );
    expect(screen.getByText("children")).toBeInTheDocument();
  });
});