import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>지뢰찾기 게임</title>
        <link rel="icon" href="/free-icon-bomb.png" />
        <link href="https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <main>{children}</main>
    </>
  )
}