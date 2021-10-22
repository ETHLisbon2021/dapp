import React from 'react'
import { useConnect, ConnectorNames } from 'web3'


const HomePage = () => {
  const { account, connect, disconnect } = useConnect()

  const handleConnect = () => {
    connect(ConnectorNames.Injected) // MetaMask
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
    </div>
  )
}


export default HomePage
