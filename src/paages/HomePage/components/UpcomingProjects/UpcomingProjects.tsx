import React from 'react'

import { WidthContainer } from 'components/layout'
import { Text } from 'components/dataDisplay'

import s from './UpcomingProjects.module.scss'


const projects = [
  {
    image: 'https://res.cloudinary.com/polkastarter/image/upload/v1634311032/projects/dose/dose-cover.png',
    logo: 'https://res.cloudinary.com/polkastarter/image/upload/v1634311014/projects/dose/dose-logo.png',
    name: 'Dose',
    token: 'DOSE',
    poolSize: 5_000_000,
    hardCap: 3_000,
  },
  {
    image: 'https://res.cloudinary.com/polkastarter/image/upload/v1634240391/projects/LFW/LFW-cover.png',
    logo: 'https://res.cloudinary.com/polkastarter/image/upload/v1634240390/projects/LFW/LFW-logo.jpg',
    name: 'Legend of Fantasy War',
    token: 'LFW',
    poolSize: 2_000_000,
    hardCap: 2_300,
  },
]

const UpcomingProjects = () => {

  return (
    <WidthContainer className={s.root}>
      <Text style="h2">Upcoming projects</Text>
      <div className={s.projects}>
        {
          projects.map(({ image, logo, name, token, poolSize, hardCap }, index) => {
            const tokenPrice = parseFloat((hardCap / poolSize).toFixed(2))
            const _hardCap = parseFloat(hardCap.toFixed(2))

            return (
              <a
                key={`${name}-${index}`}
                className={s.project}
                href={`/projects/${name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <img className={s.image} src={image} alt="" />
                <div className={s.content}>
                  <img className={s.logo} src={logo} alt="" />
                  <div className={s.name}>{name}</div>
                  <div className={s.token}>${token}</div>
                  <div className={s.info}>
                    <div className={s.row}>
                      <span>Pool Size</span>
                      <b>{poolSize} {token}</b>
                    </div>
                    <div className={s.row}>
                      <span>Hard Cap</span>
                      <b>{_hardCap} ETH</b>
                    </div>
                    <div className={s.row}>
                      <span>Token Price</span>
                      <b>{tokenPrice} ETH</b>
                    </div>
                  </div>
                </div>
              </a>
            )
          })
        }
      </div>
    </WidthContainer>
  )
}


export default UpcomingProjects
