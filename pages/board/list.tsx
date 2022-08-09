import React from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function login () {

  return (
    <div>
      로그인 페이지입니다
    </div>
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