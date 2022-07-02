import React from 'react'
import { useModal } from './useModal'

export function ModalRoot() {
  const {
    isModalVisible,
    modal: { Component, options },
  } = useModal()

  return <div id='modal-root'>{isModalVisible && <Component {...options.props} />}</div>
}
