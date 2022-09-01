import React, { useContext, useState } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import RankBox from "../components/index/RankBox";
import Start from "../components/index/StartBox";
import AccountBox from '../components/index/AccountBox';
import { DiffContext } from "../src/store/diff";
import styled from "styled-components";

export default function Home () {
 
  return (
    <>
      <><RankBox /><Start /><AccountBox /></>
    </>
  )
}

const Sorry = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
        <Navbar />
        {page}
    </Layout>
  )
}


