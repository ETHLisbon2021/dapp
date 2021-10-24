import React from 'react'

import s from './Stage.module.scss'


const Stage = () => {

  return (
    <div className={s.stage}>
      <div className={s.title}>Project's Stage</div>
      <div className={s.row}>
        <div className={s.num}>1</div>
        <div>
          <div className={s.title2}>Preparation</div>
          <div className={s.text}>This project is in preparation phase. Stay tuned.</div>
        </div>
      </div>
    </div>
  )
}


export default Stage
