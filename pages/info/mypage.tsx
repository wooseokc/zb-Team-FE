/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import MyPage from "../../components/mypage/myPageBox";
import Navbar from "../../components/navbar";
import { isMobile  } from 'react-device-detect'
import MyPageMobile from "../../components/mypage/myPageBox_mobile";

export default function mypage () {

  const [device, setDevice] = useState(true)
  useEffect(() => {

    if (isMobile) {
      setDevice(false)
    } else {
      setDevice(true)
    }
  }, [])

  return (
    <>
    {device ?
      <MyPage/>
      :
      <MyPageMobile/>
    }
    </>
  )
}

mypage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}