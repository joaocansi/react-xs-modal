import React, { ComponentType, createContext, ReactNode, useContext, useState } from 'react'
import { ModalRoot } from './ModalRoot'

interface ModalOptions {
  props?: any
}

interface ModalProps {
  Component: any
  options: ModalOptions
}

interface ModalContextProps {
  isModalVisible: boolean
  modal: ModalProps

  displayModal: (Component: ComponentType<any>, options?: ModalOptions) => void
  hideModal: () => void
}

interface ModalProviderProps {
  children: ReactNode
}

export const ModalContext = createContext({} as ModalContextProps)
export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modal, setModal] = useState<ModalProps>({} as ModalProps)

  const displayModal = (Component: ComponentType<any>, options: ModalOptions = {}) => {
    setModal({ Component, options })
    setIsModalVisible(true)
  }
  const hideModal = () => {
    setModal({} as ModalProps)
    setIsModalVisible(false)
  }

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        modal,
        displayModal,
        hideModal,
      }}
    >
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  )
}
export const useModal = () => useContext(ModalContext)
