import React from 'react'
import Head from 'next/head'

import '../scss/globals.scss'


const title = ''
const description = ''

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="og:url" content={''} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}


export default MyApp
