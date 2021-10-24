import React, { useState } from 'react'
import { useConnect } from 'web3'
import { getContract } from 'contracts'
import { parseUnits } from '@ethersproject/units'

import { WidthContainer } from 'components/layout'

import Stage from './components/Stage/Stage'
import Stats from './components/Stats/Stats'
import ApplyCard from './components/ApplyCard/ApplyCard'
import Presets from './components/Presets/Presets'
import Participants from './components/Participants/Participants'

import useProjectPage from './utils/useProjectPage'

import s from './ProjectPage.module.scss'


const DistributeButton = ({ tokenAddress, users }) => {
  const [ isLoading, setLoading ] = useState(false)

  const handleClick = async () => {
    if (isLoading) {
      return
    }

    try {
      setLoading(true)

      const eligibleContract = getContract('eligible', true)

      const receivers = users.map(({ address }) => address)
      const amounts = users.map(({ amount }) => parseUnits(String(amount), 18))

      console.log('receivers:', receivers)
      console.log('amounts:', amounts)

      const receipt = await eligibleContract.distribute(tokenAddress, receivers, amounts)
      const trx = await receipt.wait()

      setLoading(false)

      // TODO tempo hash for demo - added on 10/24/21 by pavelivanov
      window.location.href = window.location.href
    }
    catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <WidthContainer>
      <div className={s.distributeButton} onClick={handleClick}>
        {
          isLoading ? (
            <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
          ) : (
            <span>Distribute tokens!</span>
          )
        }
      </div>
    </WidthContainer>
  )
}

const StopWhitelistButton = ({ tokenAddress }) => {
  const [ isLoading, setLoading ] = useState(false)

  const handleClick = async () => {
    if (isLoading) {
      return
    }

    try {
      setLoading(true)

      const eligibleContract = getContract('eligible', true)

      const receipt = await eligibleContract.stopWhitelist(tokenAddress)
      const trx = await receipt.wait()

      setLoading(false)

      // TODO tempo hash for demo - added on 10/24/21 by pavelivanov
      window.location.href = window.location.href
    }
    catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className={s.stopWhitelistButton} onClick={handleClick}>
      {
        isLoading ? (
          <img className={s.spinner} src="/images/svg/16/spinner.svg" alt="" />
        ) : (
          <span>Time travel (for dev purpose only, use with caution!)</span>
        )
      }
    </div>
  )
}

const ProjectPage = ({ tokenAddress }) => {
  const { account } = useConnect()
  const { isFetching, project, presetState, users } = useProjectPage(tokenAddress)

  const { cover, logo, name, about, owner, allocation, state } = project || {}

  const isOwner = account === owner

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
                    <Stage state={state} />
                    <div className={s.about}>{about}</div>
                  </div>
                  {
                    isOwner && state === 1 /* Active */ && (
                      <StopWhitelistButton tokenAddress={tokenAddress} />
                    )
                  }
                </div>
                {
                  !isOwner && state === 1 && (
                    <ApplyCard tokenAddress={tokenAddress} allocation={allocation} />
                  )
                }
              </div>
            </div>
          )
        }
      </WidthContainer>
      {
        isOwner && state === 2 /* Finished */ && (
          <Presets tokenAddress={tokenAddress} presetState={presetState} />
        )
      }
      <Participants data={users} tokenSymbol={project?.tokenSymbol} />
      {
        isOwner && state === 2 /* Finished */ && (
          <DistributeButton tokenAddress={tokenAddress} users={users} />
        )
      }
    </>
  )
}

ProjectPage.getInitialProps = async ({ query }) => {

  return {
    tokenAddress: query.tokenAddress,
  }
}


export default ProjectPage
