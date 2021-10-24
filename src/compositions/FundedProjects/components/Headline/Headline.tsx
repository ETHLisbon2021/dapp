import React from 'react'

import { Card } from 'components/layout'

import s from './Headline.module.scss'


const stats = [
  {
    title: 'Funded Projects',
    value: '80',
  },
  {
    title: 'Unique Participants',
    value: '20,135',
  },
  {
    title: 'Raised Capital',
    value: '$16,402,934',
  },
]

const Headline = ({ title }) => {

  return (
    <div className={s.headline}>
      <div>
        <div className={s.rootTitle}>{title}</div>
        <div className={s.text}>We bring new technologies to our community</div>
      </div>
      <Card className={s.stats}>
        {
          stats.map(({ title, value }) => (
            <div key={title} className={s.stat}>
              <span>{title}</span>
              <b>{value}</b>
            </div>
          ))
        }
      </Card>
    </div>
  )
}


export default Headline
