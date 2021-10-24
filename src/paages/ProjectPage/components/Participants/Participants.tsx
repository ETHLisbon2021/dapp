import React from 'react'

import { WidthContainer } from 'components/layout'

import s from './Participants.module.scss'


const titles = [
  'Address',
  'Deposit',
  'Allocation',
  'Score',
]

const Participants = ({ data, tokenSymbol }) => {

  // TODO add loader - added on 10/24/21 by pavelivanov
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <WidthContainer className={s.root}>
      <div className={s.content}>
        <div className={s.title}>Participants</div>
        <div className={s.tableContainer1}>
          <div className={s.tableContainer2}>
            <div className={s.tableContainer3}>
              <table className={s.table}>
                <thead>
                <tr>
                  {
                    titles.map((title) => (
                      <th key={title}>{title}</th>
                    ))
                  }
                </tr>
                </thead>
                <tbody>
                {
                  data.map(({ address, amount, score, allocation }, index) => (
                    <tr key={`${address}-${index}`}>
                      <td>{address}</td>
                      <td>{amount} ETH</td>
                      <td>{allocation ? `${allocation} ETH` : '-'}</td>
                      <td>{score ? score : '-'}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </WidthContainer>
  )
}


export default Participants
