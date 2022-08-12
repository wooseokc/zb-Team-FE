import React from "react";
import Layout from "../../components/layout";
import MyPage from "../../components/mypage/myPageBox";
import Navbar from "../../components/navbar";

export default function mypage () {

  return (
    <>
      <MyPage/>
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