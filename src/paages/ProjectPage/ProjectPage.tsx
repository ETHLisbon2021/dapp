import React from 'react'

import { WidthContainer } from 'components/layout'

import Stage from './components/Stage/Stage'
import Stats from './components/Stats/Stats'
import ApplyCard from './components/ApplyCard/ApplyCard'
import Presets from './components/Presets/Presets'
import Participants from './components/Participants/Participants'

import useProjectPage from './utils/useProjectPage'

import s from './ProjectPage.module.scss'


const ProjectPage = ({ tokenAddress }) => {
  const { isFetching, project, users } = useProjectPage(tokenAddress)

  const { cover, logo, name, about } = project || {}

  return (
    <>
      <WidthContainer>
        {
          isFetching ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className={s.imageContainer} style={{ backgroundImage: `url(${cover})` }}>
                <img className={s.logo} src={logo} alt="" />
              </div>
              <div className={s.row}>
                <div className={s.content}>
                  <div className={s.name}>{name}</div>
                  <Stats data={project} />
                  <div className={s.stageAndAbout}>
                    <Stage />
                    <div className={s.about}>{about}</div>
                  </div>

                </div>
                <ApplyCard tokenAddress={tokenAddress} />
              </div>
            </div>
          )
        }
      </WidthContainer>
      <Presets tokenAddress={tokenAddress} />
      <Participants data={users} tokenSymbol={project?.tokenSymbol} />
    </>
  )
}

ProjectPage.getInitialProps = async ({ query }) => {

  return {
    tokenAddress: query.tokenAddress,
  }
}


export default ProjectPage
