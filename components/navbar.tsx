import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <button>Logo</button>
      </Link>
      <Link href="/board/list">
        <button>자유게시판</button>
      </Link>
      <Link href="/board/rank">
        <button>랭킹보기</button>
      </Link>
      <Link href="/info/mypage">
        <button>Contact</button>
      </Link>
    </nav>
  )
}