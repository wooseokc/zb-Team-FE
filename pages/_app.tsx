import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import NavbarMobile from '../components/navbar_mobile'
import Diffstrore from '../src/store/diff'
import { isMobile  } from 'react-device-detect'
import GS from '../src/styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  const [device, setDevice] = useState(true)
  useEffect(() => {

    if (isMobile) {
      setDevice(false)
    } else {
      setDevice(true)
    }
  }, [])


  const theme: DefaultTheme = {
    
  }

  return (<>
              <GS/>
    <ThemeProvider theme={theme}>
      <Layout>
        <Diffstrore>
          { device ?
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