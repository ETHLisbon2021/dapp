import React from 'react'

import { WidthContainer } from 'components/layout'

import s from './Hero.module.scss'


const Hero = () => {

  return (
    <div className={s.hero}>
      <WidthContainer>
        <div className={s.title}>
          <div><span>Eligible</span> is a new word in the sale and purchase of tokens</div>
          <div><span>Eligible</span> is a new word in the sale and purchase of tokens</div>
        </div>
      </WidthContainer>
    </div>
  )
}


export default Hero
