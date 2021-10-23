import React from 'react'
import Link from 'next/link'
import { useConnect } from 'web3'
import { shortenAddress } from 'helpers'
import cx from 'classnames'

import { ActiveLink } from 'components/actions'
import { WidthContainer } from 'components/layout'
import ConnectModal, { openConnectModal } from 'compositions/modals/ConnectModal/ConnectModal'

import s from './Header.module.scss'


const AccountButton = () => {
  const { account, disconnect } = useConnect()

  if (!account) {
    const handleConnect = () => {
      openConnectModal()
    }

    return (
      <div className={cx(s.navItem, s.connectButton)} onClick={handleConnect}>
        Connect Wallet
      </div>
    )
  }

  return (
    <div className={cx(s.navItem, s.accountButton)}>
      <span>{shortenAddress(account)}</span>
      <b onClick={disconnect}>Exit</b>
    </div>
  )
}

const nav = [
  {
    title: 'Projects',
    link: '/projects',
  },
  // {
  //   title: 'Check Rating',
  //   link: '/rating',
  // },
  {
    title: 'Create Project',
    link: '/projects/create',
  },
]

const Header = () => {

  return (
    <header className={s.header}>
      <WidthContainer className={s.content}>
        <Link href="/projects">
          <a className={s.logo}>
            <span>Eligible</span>
          </a>
        </Link>
        <div className={s.nav}>
          {
            nav.map(({ title, link }) => (
              <ActiveLink key={title} href={link} activeClassName={s.active} exact>
                <a className={s.navItem}>{title}</a>
              </ActiveLink>
            ))
          }
          <AccountButton />
        </div>
      </WidthContainer>
      <ConnectModal />
    </header>
  )
}


export default Header
