import Head from 'next/head'

import { Header } from './'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout
