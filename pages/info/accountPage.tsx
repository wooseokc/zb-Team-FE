import React from 'react'
import Account from '../../components/info/account';
import Layout from '../../components/layout';
import Navbar from '../../components/navbar';


function AccountPage() {

  return (
    <Account />
  )
}

AccountPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}


export default AccountPage
