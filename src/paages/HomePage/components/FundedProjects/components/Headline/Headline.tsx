import React from 'react'

import { Text } from 'components/dataDisplay'

import s from './Headline.module.scss'


const stats = [
  {
    icon: '',
    title: 'Funded Projects',
    value: '80',
  },
  {
    icon: '',
    title: 'Unique Participants',
    value: '20,135',
  },
  {
    icon: '',
    title: 'Raised Capital',
    value: '$16,402,934',
  },
]

const Headline = () => {

  return (
    <div className={s.headline}>
      <div>
        <Text style="h2">Funded projects</Text>
        <Text style="p1" color="300">We bring new technologies to our community</Text>
      </div>
      <div className={s.stats}>
        {
          stats.map(({ icon, title, value }) => (
            <div key={title} className={s.stat}>
              <div className={s.title}>{title}</div>
              <div className={s.value}>{value}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Headline
