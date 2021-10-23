import React from 'react'
import cx from 'classnames'

import s from './Card.module.scss'


type CardProps = {
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {

  return (
    <div className={cx(s.card, className)}>
      {children}
    </div>
  )
}


export default Card
