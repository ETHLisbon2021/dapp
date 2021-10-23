import React from 'react'
import cx from 'classnames'

import s from './Text.module.scss'


export const stylesMap = {
  header: [ 'h1' , 'h2' , 'h3' ],
  body: [ 'p1', 'p2' ],
} as const

export const styles = [
  ...stylesMap.header,
  ...stylesMap.body,
] as const

export const colors = [
  '100',
  '200',
  '300',
  '400',
  '500',
  'accent',
  'accent-100',
  'accent-200',
  'warning',
  'attention',
] as const

export const aligns = [ 'left', 'center', 'right' ] as const

export type TextStyle = typeof styles[number]
export type TextColor = typeof colors[number]
export type TextAlign = typeof aligns[number]

export type TextProps = {
  children?: React.ReactNode,
  className?: string
  tag?: string
  style: TextStyle
  color?: TextColor
  align?: TextAlign
  html?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

const Text: React.FunctionComponent<TextProps> = (props) => {
  let {
    children, className, tag = 'div',
    style, color, align,
    onClick,
  } = props

  if (onClick && tag !== 'button') {
    console.error('You can\'t use "onClick" without passing tag === "button". Create components ADA friendly!')
  }

  const textClassName = cx(s.text, className, {
    [s[style]]: style,
    [s[`c-${color}`]]: color,
    [`text-${align}`]: align,
  })

  return (
    React.createElement(tag, {
      className: textClassName,
      dangerouslySetInnerHTML: { __html: children },
      onClick,
    })
  )
}


export default Text
