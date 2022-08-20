/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import MyLastGame from "../../../components/info/mylastgame/myLastGame";

export default function myLastGame () {

  const router = useRouter();
  const { id } = router.query



  return (
    <>
      <MyLastGame id={id as string}/>
    </>
  )
}

myLastGame.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}