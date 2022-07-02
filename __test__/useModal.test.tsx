import React from "react";

import { fireEvent, render } from "@testing-library/react";
import { ModalProvider, ModalContext, useModal } from "../src/useModal";

const Modal = () => <span id="modal">modal</span>;
const TestComponent = () => {
  const { displayModal, hideModal } = useModal();

  return (
    <>
      <button onClick={() => displayModal(Modal)}>open</button>
      <button onClick={() => hideModal()}>close</button>
    </>
  );
};

describe("useModal", () => {
  it("should create modal context but undefined", () => {
    let { container } = render(
      <ModalContext.Consumer>
        {(value) => <>{value.isModalVisible && <span>modal</span>}</>}
      </ModalContext.Consumer>
    );

    expect(container.querySelector("span")).toBeFalsy();
  });

  it("should hide and close a modal", () => {
    const { container, getByText } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(getByText("open"));
    expect(getByText("modal")).toBeTruthy();

    fireEvent.click(getByText("close"));
    expect(container.querySelector("span#modal")).toBeFalsy();
  });

  it("should render the children and modal-root when using ModalProvider", () => {
    let { container } = render(
      <ModalProvider>
        <h1>children</h1>
      </ModalProvider>
    );

    expect(container.firstChild?.textContent).toBe("children");
    expect(container.querySelector("div#modal-root")).toBeTruthy();
  });
});
