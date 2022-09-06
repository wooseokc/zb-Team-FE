/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import MultiSection from "../../components/multigame/multibox";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function game () {




  return (
    <>

      <MultiSection/>
    
    </>
  )
}


game.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}