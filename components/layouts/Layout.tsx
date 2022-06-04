import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui/Navbar';

interface Props {
  children?: React.ReactNode;
  title?: string
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Javier Ochoa'/>
        <meta name='description' content='Informacion del Pokemon'/>
        <meta name='keywords' content='Pokemon, pokedex'/>
      </Head>
      <Navbar/>
      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}
