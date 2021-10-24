import React from 'react'

import s from './Stage.module.scss'


const Stage = ({ state }) => {
  if (state === undefined) {
    return null
  }

  const { title, text } = ([
    {
      title: 'Not active',
      text: 'This project will be run soon. Stay tuned.',
    },
    {
      title: 'Active',
      text: 'This project is in active phase. Have time to apply.',
    },
    {
      title: 'Finished',
      text: 'Whitelisting period is finished. Wait for tokens distribution.',
    },
    {
      title: 'Closed',
      text: 'This project is finished. Tokens were distributed.',
    },
  ])[Number(state)]

  return (
    <div className={s.stage}>
      <div className={s.title}>Project's Stage</div>
      <div className={s.row}>
        <div className={s.num}>{state + 1}</div>
        <div>
          <div className={s.title2}>{title}</div>
          <div className={s.text}>{text}</div>
        </div>
      </div>
    </div>
  )
}


export default Stage
