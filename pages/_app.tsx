import { AppProps } from 'next/app'
import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Diffstrore from '../src/store/diff'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page)
  const theme: DefaultTheme = {

  }
  return (<>
    <ThemeProvider theme={theme}>
      <Layout>
        <Navbar />
        <Diffstrore>
          <Component {...pageProps} />

        </Diffstrore>
      </Layout>
    </ThemeProvider>
  </>)
}