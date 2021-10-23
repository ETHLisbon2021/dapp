import React from 'react'
import Head from 'next/head'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ContractsProvider } from 'contracts'
import { Connector } from 'web3'

import MainLayout from 'layouts/MainLayout/MainLayout'

import '../scss/globals.scss'
import '../scss/date-picker.scss'


const getWeb3ReactLibrary = (provider, connector) => {
  const lib = new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
  lib.pollingInterval = 12000

  return lib
}

const title = ''
const description = ''

const SafeHydrate = ({ children }) => (
  <div id="hydrateWrapper" suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

const MyApp = ({ Component, pageProps }) => {

  return (
    <SafeHydrate>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="og:url" content={''} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <Web3ReactProvider getLibrary={getWeb3ReactLibrary}>
        <Connector>
          <ContractsProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <div id="modals" />
          </ContractsProvider>
        </Connector>
      </Web3ReactProvider>
    </SafeHydrate>
  )
}


export default MyApp
