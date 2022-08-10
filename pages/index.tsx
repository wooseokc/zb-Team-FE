import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import RankBox from "../components/index/RankBox";
import Start from "../components/index/StartBox";

export default function Home () {

  return (
    <>
      <RankBox/>
      <Start/>
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


