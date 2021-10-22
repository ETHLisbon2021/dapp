import React, { useEffect } from 'react'

import useConnect from './useConnect'
import constants from './constants'


const Connector: React.FunctionComponent = ({ children }) => {
  const { connect } = useConnect()

  useEffect(() => {
    const connectorName = localStorage.getItem(constants.connectorName)

    if (connectorName) {
      connect(connectorName as any)
    }
  }, [])

  return (
    <>{children}</>
  )
}


export default Connector
