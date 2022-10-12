import "@testing-library/jest-dom";
import Modal from "components/organisms/Modal";
import { render, screen } from "@testing-library/react";

describe("Modal", () => {
  it("cannot render content when modal closed", async () => {
    render(
      <Modal isModalOpen={false} setIsModalOpen={jest.fn()}>
        <p>content</p>
      </Modal>
    );
    expect(screen.queryByText("content")).toBeNull();
  });

  it("can render content when modal opened", async () => {
    render(
      <Modal isModalOpen={true} setIsModalOpen={jest.fn()}>
        <p>content</p>
      </Modal>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
