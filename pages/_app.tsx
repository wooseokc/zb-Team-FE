import { AppProps } from 'next/app'
import React, { useContext, useEffect, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import NavbarMobile from '../components/navbar_mobile'
import Diffstrore, { DiffContext } from '../src/store/diff'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout || ((page) => page)
  // const storeWidth : number = useContext(DiffContext).diff.width
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)

  }, [])
  const theme: DefaultTheme = {

  }
  return (<>
    <ThemeProvider theme={theme}>
      <Layout>
        <Diffstrore>
          {width > 600 ? 
            <>
              <Navbar />
              <Component {...pageProps} />
            </>
          :
          <>
              <NavbarMobile />
              <Component {...pageProps} />
          </>
        }
        </Diffstrore>
      </Layout>
    </ThemeProvider>
  </>)
}