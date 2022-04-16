import { useEffect, useRef, useState } from 'react'
import './modal.scss'

type Props = {
  active: boolean
  id: string
  children: React.ReactNode
}

type ModalContentProps = {
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = (
  props: Props
) => {
  const [active, setActive] = useState(false)


  useEffect(() => {
    setActive(props.active)
  }, [props.active])

  return (
    <div
      id={props.id}
      className={
        `modal ${active ? 'active' : ''}`
      }
    >
      {props.children}
    </div>
  )
}

export const ModalContent = (
  { onClose, children }: ModalContentProps) => {

  const contentRef = useRef<any>(null)

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active')

    if (onClose) onClose()
  }

  return (
    <div
      ref={contentRef}
      className="modal__content"
    >
      {children}
      <div
        className="modal__content__close"
        onClick={closeModal}
      >
        <i className="bx bx-x"></i>
      </div>
    </div>
  )
}