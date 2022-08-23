import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>지뢰찾기 게임</title>
        <link rel="icon" href="/free-icon-bomb.png" />
      </Head>
      <main>{children}</main>
    </>
  )
}