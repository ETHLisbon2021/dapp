import React from 'react'

import { Card } from 'components/layout'

import s from './RatingCard.module.scss'


const RatingCard = () => {

  return (
    <div className={s.root}>
      <img className={s.star1} src="/images/star-1.svg" />
      <img className={s.star2} src="/images/star-2.svg" />
      <Card className={s.card}>
        <div className={s.content}>
          <div className={s.title}>Check your rating</div>
          <input className={s.input} type="text" placeholder="YOUR ETH WALLET ADDRESS" />
          <div className={s.disclaimer}>
            <b>Disclaimer</b>: We use a rating system for our investors. Here you can check your rating and find out which is yours based on our parameters.
            Remember that project holders can use their own rating system and its parameters may be radically different from ours.
          </div>
        </div>
        <div className={s.button}>Check</div>
      </Card>
    </div>
  )
}


export default RatingCard
