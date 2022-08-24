import React from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import Chating from '../../components/border/Chating'

export default function login () {

  return (
    <>
      <Chating />
    </>
  )
}

login.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}