import React from 'react'

import { WidthContainer, Card } from 'components/layout'

import useProjectPage from './utils/useProjectPage'

import s from './ProjectPage.module.scss'


const data = {
  image: 'https://res.cloudinary.com/polkastarter/image/upload/v1634311032/projects/dose/dose-cover.png',
  logo: 'https://res.cloudinary.com/polkastarter/image/upload/v1634311014/projects/dose/dose-logo.png',
  name: 'Dose',
  about: 'Developed in Unreal Engine and on the Solana network, Cryowar is an amalgam between traditional gaming experience and best practices of the blockchain world, DAO voting, NFT, DEFI and Play-to-Earn. Cryowar aims to create a multi-blockchain Medieval Metaverse without boundaries.',
  token: 'DOSE',
  poolSize: 5_000_000,
  hardCap: 3_000,
  allocation: 2.2,
}

const ProjectPage = ({ tokenAddress }) => {
  const { image, logo, name, about, token, poolSize, hardCap, allocation } = data

  const { isFetching, project } = useProjectPage(tokenAddress)

  let tokenPrice = parseFloat((hardCap / poolSize).toFixed(5))
  const _hardCap = parseFloat(hardCap.toFixed(2))

  if (!tokenPrice) {
    tokenPrice = hardCap / poolSize
  }

  return (
    <WidthContainer>
      <div className={s.imageContainer} style={{ backgroundImage: `url(${image})` }}>
        <img className={s.logo} src={logo} alt="" />
      </div>
      <div className={s.content}>
        <div className={s.name}>{name}</div>
        <Card className={s.stats}>
          <div className={s.stat}>
            <span>Pool Size</span>
            <b>{poolSize} {token}</b>
          </div>
          <div className={s.stat}>
            <span>Hard Cap</span>
            <b>{_hardCap} ETH</b>
          </div>
          <div className={s.stat}>
            <span>Token Price</span>
            <b>{tokenPrice} ETH</b>
          </div>
          <div className={s.stat}>
            <span>Allocation</span>
            <b>{allocation} ETH</b>
          </div>
        </Card>
        <div className={s.about}>{about}</div>
        <div className={s.participateButton}>Participate</div>
      </div>
    </WidthContainer>
  )
}

ProjectPage.getInitialProps = async ({ query }) => {

  return {
    tokenAddress: query.tokenAddress,
  }
}


export default ProjectPage
