import React from "react";
import EmailAuthForm from '../../components/info/EmailAuthForm';
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function emailAuthPage () {

  return (
    <>
      <EmailAuthForm />
    </>
  )
}

emailAuthPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

