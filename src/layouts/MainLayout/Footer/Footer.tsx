import React from 'react'

import { WidthContainer } from 'components/layout'

import s from './Footer.module.scss'


const Footer = () => {

  return (
    <footer className={s.footer}>
      <WidthContainer>
        <div className={s.content}>
          <div className={s.logo}>Eligible</div>
          <div className={s.withLove}>Made with ❤️ on ETHLisbon 2021</div>
        </div>
      </WidthContainer>
    </footer>
  )
}


export default Footer
