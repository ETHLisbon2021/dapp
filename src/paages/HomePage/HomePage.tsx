import React from 'react'
import { useConnect } from 'web3'

import ConnectModal, { openConnectModal } from 'compositions/modals/ConnectModal/ConnectModal'


const HomePage = () => {
  const { account, disconnect } = useConnect()

  const handleConnect = () => {
    openConnectModal()
  }

  return (
    <div>
      {
        Boolean(account) ? (
          <div>
            <div>{account}</div>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        ) : (
          <button onClick={handleConnect}>Connect</button>
        )
      }
      <ConnectModal />
    </div>
  )
}


export default HomePage
