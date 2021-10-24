import React from 'react'
import cx from 'classnames'

import { WidthContainer, Card } from 'components/layout'
import { Title } from 'components/dataDisplay'

import usePresets from './utils/usePresets'

import s from './Presets.module.scss'


const Preset = ({ data, loading, active, onSelect }) => {
  const { id, name, description } = data

  return (
    <Card className={cx(s.preset, { [s.active]: active })}>
      <div className={s.content}>
        <div className={s.name}>{name}</div>
        <div className={s.label}>Filter criteria:</div>
        <div className={s.description}>{description}</div>
      </div>
      <div className={s.button} onClick={onSelect}>
        {
          loading ? (
            <img src="/images/svg/16/spinner.svg" alt="" />
          ) : (
            <span>{active ? 'Selected' : 'Filter users'}</span>
          )
        }
      </div>
    </Card>
  )
}

const Presets = ({ tokenAddress, presetState }) => {
  const { isFetching, presets, selectingIndex, selectedIndex, select } = usePresets({ tokenAddress })

  return (
    <WidthContainer className={s.root}>
      <div className={s.rootContent}>
        <Title className={s.title}>Filter users</Title>
        {
          isFetching ? (
            <div>Loading...</div>
          ) : (
            <div className={s.presets}>
              {
                presets.map((data, index) => {
                  const active = index === selectedIndex || (selectedIndex === null && presetState.presetId === data.id)

                  return (
                    <Preset
                      key={data.id || index}
                      data={data}
                      loading={index === selectingIndex}
                      active={active}
                      onSelect={active ? null : () => select(index)}
                    />
                  )
                })
              }
            </div>
          )
        }
      </div>
    </WidthContainer>
  )
}


export default Presets
