import React from 'react'

import { WidthContainer } from 'components/layout'
import { Title } from 'components/dataDisplay'

import RatingCard from './components/RatingCard/RatingCard'

import s from './Hero.module.scss'


const Hero = () => {

  return (
    <div className={s.hero}>
      <WidthContainer>
        <div className={s.content}>
          <Title className={s.title}>
            <span>Eligible</span> is a new word in the sale and purchase of tokens
          </Title>
          <RatingCard />
        </div>
      </WidthContainer>
    </div>
  )
}


export default Hero
