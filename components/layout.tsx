import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>지뢰찾기 게임</title>
        <meta
        name="description"
        content={
          '지뢰찾기를 플레이하고 당신의 게임을 저장하세요!'
        }
      />
      <meta name="keyword" content="게임, 지뢰찾기, 웹게임, 지뢰, game"></meta>
      <meta name="google-site-verification" content="wTiPK6SDAIV6WcHmw3tEnXTa4xaRsNAfS2yr84afRnw" />
      <meta name="naver-site-verification" content="795f8fe62d848edb1171d4bbb8fab6fc035ea929" />
      <meta property="og:title" content="지뢰찾기 | 지뢰찾기 플레이!"></meta>
      <meta property="og:description" content="지뢰찾기를 플레이하고 당신의 게임을 저장하세요!"></meta>
      <meta property="og:type" content="website"></meta>
        <link rel="icon" href="/free-icon-bomb.png" />
        <link href="https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <main>{children}</main>
    </>
  )
}