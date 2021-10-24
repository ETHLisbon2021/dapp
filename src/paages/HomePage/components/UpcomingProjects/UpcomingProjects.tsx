import React from 'react'

import { WidthContainer } from 'components/layout'

import useUpcomingProjects from './utils/useUpcomingProjects'

import s from './UpcomingProjects.module.scss'


const ProjectCard = ({ data }) => {
  const { cover, logo, name, tokenAddress, tokenSymbol, poolSize, hardCap, tokenPrice } = data

  const handleParticipate = (event) => {
    // event.preventDefault()
    // event.stopPropagation()
  }

  return (
    <div className={s.projectCard}>
      <a
        className={s.project}
        href={`/projects/${tokenAddress}`}
      >
        <img className={s.cover} src={cover} alt="" />
        <div className={s.content}>
          <img className={s.logo} src={logo} alt="" />
          <div className={s.name}>{name}</div>
          <div className={s.token}>${tokenSymbol}</div>
          <div className={s.info}>
            <div className={s.row}>
              <span>Pool Size</span>
              <b>{poolSize} {tokenSymbol}</b>
            </div>
            <div className={s.row}>
              <span>Hard Cap</span>
              <b>{hardCap} ETH</b>
            </div>
            <div className={s.row}>
              <span>Token Price</span>
              <b>{tokenPrice} ETH</b>
            </div>
          </div>
        </div>
        <div className={s.participateButton} onClick={handleParticipate}>Participate</div>
      </a>
    </div>
  )
}

const UpcomingProjects = () => {
  const { isFetching, projects } = useUpcomingProjects()

  return (
    <WidthContainer className={s.root}>
      <div className={s.rootTitle}>Upcoming projects</div>
      {
        isFetching ? (
          <div>Fetching...</div>
        ) : (
          projects?.length ? (
            <div className={s.projects}>
              {
                projects.map((data, index) => {

                  return (
                    <ProjectCard key={`${data.name}-${index}`} data={data} />
                  )
                })
              }
            </div>
          ) : (
            <div>Nothing to show...</div>
          )
        )
      }
    </WidthContainer>
  )
}


export default UpcomingProjects
