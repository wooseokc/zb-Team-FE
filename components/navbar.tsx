import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export default function Navbar() {
  return (
    <NavBox>
      <Link href="/">
        <NavButton char='logo'>로고</NavButton>
      </Link>
      <NavListBox>
        <Link href="/board/list">
          <NavButton>자유게시판</NavButton>
        </Link>
        <Link href="/board/rank">
          <NavButton>랭킹보기</NavButton>
        </Link>
        <Link href="/info/mypage">
          <NavButton>마이페이지</NavButton>
        </Link>
      </NavListBox>
      <Link href="/info/login">
        <LoginButton>로그인</LoginButton>
      </Link>
    </NavBox>
  )
}

const NavBox = styled.nav`
  width : 70%;
  height : 40px;
  border : 1px solid;

  position : relative;
  left : 50%;
  transform: translateX(-50%);


  display : flex;
`

const NavListBox = styled.div`
  width : 50%;
  height : 40px;

  position : relative;
  left : 20%;

  display : flex;
  justify-content: space-between;

`

const NavButton = styled.button<{char? : string}>`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 90px;
  border : 1px solid;
  border-radius: 3px;
  display : block;

  ${props => props.char === 'logo' && {width : 40, borderRadius : 100}}
`

const LoginButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 40px;
  height : 40px;

  border : 1px solid;
  border-radius: 100%;

  font-size : 10px;
  
  display : block;

  position : absolute;
  right : -50px;
`