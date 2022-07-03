import React, { ComponentType, CSSProperties, useEffect, useRef } from 'react'
import { useModal } from './useModal'

interface AsModalOptionsProps {
  style?: {
    overlayStyle?: CSSProperties
    contentStyle?: CSSProperties
  }
  closeOnClick?: boolean
  allowScroll?: boolean
}

export function asModal<T>(Component: ComponentType<T>, options: AsModalOptionsProps) {
  return function (props: T) {
    const { hideModal } = useModal()
    const contentRef = useRef<HTMLDivElement>(null)

    const handleOnClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const overlay = document.getElementById('modal-overlay')

      if (contentRef.current && !contentRef.current.contains(target) && overlay?.contains(target)) {
        hideModal()
      }
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
        <div ref={contentRef} id='modal-content' style={options.style?.contentStyle}>
          <Component {...props} />
        </div>
      </div>
    )
  }
}
