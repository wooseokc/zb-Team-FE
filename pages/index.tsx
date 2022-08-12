import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import RankBox from "../components/index/RankBox";
import Start from "../components/index/StartBox";
import AccountBox from '../components/index/AccountBox';

export default function Home () {

  return (
    <>
      <RankBox/>
      <Start />
      <AccountBox />
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}


