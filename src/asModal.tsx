import React, { ComponentType, CSSProperties, useEffect } from 'react'
import { useModal } from './useModal'

interface AsModalOptionsProps {
  style?: {
    overlayStyle?: CSSProperties
    contentStyle?: CSSProperties
  }
  closeOnClick?: boolean
}

export function asModal<T>(Component: ComponentType<T>, options: AsModalOptionsProps) {
  return function (props: T) {
    const { hideModal } = useModal()

    const handleOnClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const modalOverlay = document.getElementById('modal-overlay')

      if (target.contains(modalOverlay)) hideModal()
    }

    useEffect(() => {
      if (options.closeOnClick) {
        document.addEventListener('click', handleOnClickOutside)

        return () => {
          document.removeEventListener('click', handleOnClickOutside)
        }
      }

      return
    }, [])

    return (
      <div id='modal-overlay' style={options.style?.overlayStyle}>
        <div id='modal-content' style={options.style?.contentStyle}>
          <Component {...props} />
        </div>
      </div>
    )
  }
}
