/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import GameSection from "../../components/game/gamebox";
import GameSelector from "../../components/game/gameSelector";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function game () {
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  const [mines, setMines] = useState(10)

  function propsWidth (num : number) {
    setWidth(num);
  }
  function propsHeight (num : number) {
    setHeight(num);
  }
  function propsMines (num : number) {
    setMines(num);
  }

  return (
    <>
      <GameSelector width={propsWidth} height={propsHeight} mine={propsMines}/>
      <GameSection width={width} height={height} mine={mines}/>
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