import React, { useState } from 'react'
import { useConnect } from 'web3'
import { modalVisibility, openModal, ModalVisibilityProps } from 'modal'

import { PlainModal } from 'components/feedback'

import s from './ConnectModal.module.scss'


const connectors = [
  {
    icon: '/images/svg/wallets/metamask.svg',
    title: 'Metamask',
    connector: 'injected',
  },
  {
    icon: '/images/svg/wallets/walletconnect.svg',
    title: 'WalletConnect',
    connector: 'walletconnect',
  },
]

type ButtonProps = {
  icon: any
  title: string
  connector: any
  disabled: boolean
  onClick: (connector: any) => void
}

let Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { icon, title, connector, disabled, onClick } = props

  const handleClick = () => {
    onClick(connector)
  }

  return (
    <button
      className={s.button}
      disabled={disabled}
      onClick={handleClick}
    >
      <span>{title}</span>
      <div className={s.buttonBg} style={{ backgroundImage: `url(${icon})` }} />
    </button>
  )
}

Button = React.memo(Button)

type ConnectModalProps = ModalVisibilityProps

const ConnectModal: React.FunctionComponent<ConnectModalProps> = ({ closeModal }) => {
  const { connect } = useConnect()
  const [ isConnecting, setConnectingState ] = useState(false)

  const handleButtonClick = (connector) => {
    setConnectingState(true)
    connect(connector, () => {
      closeModal()
    })
  }

  return (
    <PlainModal
      className={s.modal}
      closeModal={closeModal}
    >
      <div className={s.title}>Connect wallet</div>
      <div>
        {
          connectors.map(({ icon, title, connector }) => (
            <Button
              key={title}
              icon={icon}
              title={title}
              connector={connector}
              disabled={isConnecting}
              onClick={handleButtonClick}
            />
          ))
        }
      </div>
    </PlainModal>
  )
}


export const openConnectModal = () => openModal('Connect')
export const closeConnectModal = () => openModal('Connect')

export default modalVisibility('Connect', ConnectModal)
