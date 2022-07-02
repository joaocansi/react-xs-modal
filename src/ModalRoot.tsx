import React from "react";
import { useModal } from "./useModal";

export const ModalRoot = () => {
  const {
    isModalVisible,
    modal: { Component, options },
  } = useModal();

  return (
    <div id="modal-root">
      {isModalVisible && <Component {...options.props} />}
    </div>
  );
};
