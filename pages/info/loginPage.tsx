import React from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import Login from '../../components/info/login';

export default function login() {


  return (
    <Login />
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

