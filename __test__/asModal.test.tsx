import React from "react";

import { ModalProvider } from "../src/useModal";
import { fireEvent, render } from "@testing-library/react";
import { asModal } from "../src/asModal";
import { useModal } from "../src/useModal";

export const ModalTestComponent = ({ closeOnClick = false }) => {
  const { displayModal, hideModal } = useModal();
  const Modal = asModal(() => <span></span>, { closeOnClick });

  return (
    <>
      <button onClick={() => displayModal(Modal)}>open</button>
      <button onClick={hideModal}>close</button>
    </>
  );
};

describe("asModal", () => {
  it("should close when clicking outside modal content if closeOnClick is true", () => {
    const { container, getByText } = render(
      <ModalProvider>
        <ModalTestComponent closeOnClick={true} />
      </ModalProvider>
    );

    fireEvent.click(getByText("open"));
    fireEvent.click(container.querySelector("div#modal-overlay") as Element);

    expect(container.querySelector("div#modal-overlay")).toBeFalsy();
    expect(container.querySelector("div#modal-content")).toBeFalsy();
  });

  it("should not close when clicking inside modal content if closeOnClick is true", () => {
    const { container, getByText } = render(
      <ModalProvider>
        <ModalTestComponent closeOnClick={true} />
      </ModalProvider>
    );

    fireEvent.click(getByText("open"));
    fireEvent.click(container.querySelector("div#modal-content") as Element);

    expect(container.querySelector("div#modal-overlay")).toBeTruthy();
    expect(container.querySelector("div#modal-content")).toBeTruthy();
  });

  it("should not close when clicking outside modal content if closeOnClick is false", () => {
    const { container, getByText } = render(
      <ModalProvider>
        <ModalTestComponent closeOnClick={false} />
      </ModalProvider>
    );

    fireEvent.click(getByText("open"));
    fireEvent.click(container.querySelector("div#modal-overlay") as Element);

    expect(container.querySelector("div#modal-overlay")).toBeTruthy();
    expect(container.querySelector("div#modal-content")).toBeTruthy();
  });
});
