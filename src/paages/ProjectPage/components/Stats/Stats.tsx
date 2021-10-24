import React from 'react'

import { Card } from 'components/layout'

import s from './Stats.module.scss'


const Stats = ({ data }) => {
  const { poolSize, hardCap, allocation, tokenPrice, tokenSymbol } = data

  return (
    <Card className={s.stats}>
      <div className={s.stat}>
        <span>Pool Size</span>
        <b>{poolSize} {tokenSymbol}</b>
      </div>
      <div className={s.stat}>
        <span>Hard Cap</span>
        <b>{hardCap} ETH</b>
      </div>
      <div className={s.stat}>
        <span>Token Price</span>
        <b>{tokenPrice} ETH</b>
      </div>
      <div className={s.stat}>
        <span>Allocation</span>
        <b>{allocation} ETH</b>
      </div>
    </Card>
  )
}


export default Stats
