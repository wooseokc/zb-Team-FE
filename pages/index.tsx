import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/layout";
import Navbar from "../components/navbar";

export default function Home () {

  return (
    <div>
      <div>
      Welcome to 지뢰찾기!
      </div>
      <Link href="/info/login">
        <div>
        로그인으로!
        </div>
      </Link>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

