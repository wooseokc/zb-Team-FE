import React from "react";
import Password from '../../components/info/password';
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function passwordPage() {

  return (
    <Password />
  )
}


passwordPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}


