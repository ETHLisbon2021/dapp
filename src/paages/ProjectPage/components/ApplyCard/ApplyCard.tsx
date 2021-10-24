import React from 'react'

import { Card } from 'components/layout'

import s from './ApplyCard.module.scss'


const ApplyCard = () => {

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <div className={s.title}>Submit your application</div>
        <div className={s.inputContainer}>
          <input className={s.input} type="text" placeholder="AMOUNT" />
          <div className={s.maxButton}>Max</div>
        </div>
        <div className={s.balance}>
          <span>You balance:</span> <b>2,23456 ETH</b>
        </div>
      </div>
      <div className={s.button}>Submit application</div>
    </Card>
  )
}


export default ApplyCard
