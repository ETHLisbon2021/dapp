import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import s from './PlainModal.module.scss'


export type PlainModalProps = {
  className?: string
  overlayClosable?: boolean
  withCloseButton?: boolean
  closeModal: (withOnClose?: boolean) => void
}

const PlainModal: React.FunctionComponent<PlainModalProps> = (props) => {
  const { children, className, overlayClosable = true, withCloseButton = true, closeModal } = props

  const handleOverlayClick = useCallback(() => {
    if (overlayClosable) {
      closeModal(true)
    }
  }, [ overlayClosable, closeModal ])

  const handleCloseButtonClick = useCallback(() => {
    closeModal(true)
  }, [ closeModal ])

  const handleModalClick = useCallback((event) => {
    event.stopPropagation()
  }, [])

  const modalClassName = cx(s.plainModal, className)

  return createPortal(
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.container}>
        <div
          className={modalClassName}
          onClick={handleModalClick}
        >
          {
            withCloseButton && (
              <button
                className={s.closeButton}
                type="button"
                data-testid="closeButton"
                onClick={handleCloseButtonClick}
              >
                <img className={s.icon} src="/images/svg/12/dismiss.svg" />
              </button>
            )
          }
          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modals')
  )
}


export default PlainModal