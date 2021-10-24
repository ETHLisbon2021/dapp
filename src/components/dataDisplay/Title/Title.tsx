import React from 'react'
import cx from 'classnames'

import s from './Title.module.scss'


type TitleProps = {
  className?: string
}

const Title: React.FC<TitleProps> = ({ children, className }) => {

  return (
    <div className={cx(s.title, className)}>
      <div>{children}</div>
      <div>{children}</div>
    </div>
  )
}


export default Title
