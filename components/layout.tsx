import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>지뢰찾기 게임</title>
      </Head>
      <main>{children}</main>
    </>
  )
}