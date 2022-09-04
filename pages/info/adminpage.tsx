import React from "react";
import AdminPage from "../../components/info/admin/Admin";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function adminpage () {

  return (
    <AdminPage/>
  )
}

adminpage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}