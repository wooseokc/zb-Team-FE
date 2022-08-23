import { AppProps } from 'next/app'
import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page)
  const theme: DefaultTheme = {

  }
  return (<>
    <ThemeProvider theme={theme}>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </>)
}