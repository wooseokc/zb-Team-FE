/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import GameSection from "../../components/game/gamebox";
import GameSectionMobile from "../../components/game/gamebox_mobile";
import GameSelector from "../../components/game/gameSelector";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { isMobile  } from 'react-device-detect'

export default function game () {
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  const [mines, setMines] = useState(10)
  const [device, setDevice] = useState(true)

  useEffect(() => {

    if (isMobile) {
      setDevice(false)
    } else {
      setDevice(true)
    }
  }, [])



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
      {device ?
      <GameSection width={width} height={height} mine={mines}/>
      :
      <GameSectionMobile width={width} height={height} mine={mines}/>
    }
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