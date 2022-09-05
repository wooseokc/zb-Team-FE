/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import MultiGameSection from "../../components/multigame/multibox";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function game () {
  const [width, setWidth] = useState(16)
  const [height, setHeight] = useState(16)
  const [mines, setMines] = useState(40)



  return (
    <>

      <MultiGameSection width={width} height={height} mine={mines}/>
    
    </>
  )
}


game.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}