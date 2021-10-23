import React from 'react'
import dayjs from 'dayjs'

import { WidthContainer } from 'components/layout'

import Headline from './components/Headline/Headline'

import s from './FundedProjects.module.scss'


const titles = [
  'Project',
  'Participants',
  'Total Raised',
  'Current Price',
  'Ended in (UTC)',
]

const projects = [
  {
    logo: 'https://res.cloudinary.com/polkastarter/image/upload/v1634311014/projects/dose/dose-logo.png',
    name: 'Dose',
    token: 'DOSE',
    participants: 100_000,
    raised: 100_000,
    price: 1.7,
    endedAt: 1634287201000,
  },
  {
    logo: 'https://res.cloudinary.com/polkastarter/image/upload/v1634240390/projects/LFW/LFW-logo.jpg',
    name: 'Legend of Fantasy War',
    token: 'LFW',
    participants: 250_000,
    raised: 250_000,
    price: 0.6,
    endedAt: 1634287201000,
  },
]

const FundedProjects = () => {

  return (
    <WidthContainer className={s.root}>
      <Headline />
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
            projects.map(({ logo, name, token, participants, raised, price, endedAt }, index) => (
              <tr key={`${name}-${index}`}>
                <td>
                  <div className={s.main}>
                    <img className={s.logo} src={logo} alt="" />
                    <div>
                      <div className={s.name}>{name}</div>
                      <div className={s.token}>{token}</div>
                    </div>
                  </div>
                </td>
                <td>{participants}</td>
                <td>{raised} ETH</td>
                <td>{price} ETH</td>
                <td>{dayjs(endedAt).format('MMM DD YYYY')}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </WidthContainer>
  )
}


export default FundedProjects
