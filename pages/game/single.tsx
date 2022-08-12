import React from "react";
import GameSection from "../../components/game/gamebox";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function game () {

  return (
    <GameSection/>
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