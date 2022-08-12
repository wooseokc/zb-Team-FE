import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

export default function Navbar() {
  return (
    <>
    <NavBox>
      <Link href="/">
        <NavButton char='logo'>
          <Image src='/free-icon-bomb.png' alt='bomlogo' width='40' height="40"/>
        </NavButton>
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
      <Link href="/info/loginPage">
        <LoginButton>Log in</LoginButton>
      </Link>
    </NavBox>
    
    </>
  )
}

const NavBox = styled.nav`
  width : 50%;
  max-width: 900px;
  height : 40px;

  position : relative;
  margin: 0 auto;

  display : flex;
  align-items: center;
`

const NavListBox = styled.div`
  width : 100%;
  height : 40px;

  display : flex;
  justify-content: space-evenly;
  

`

const NavButton = styled.button<{char? : string}>`
  background: inherit ; box-shadow:none;  padding:0; overflow:visible; cursor:pointer;

  width : 90px;

  border : 2px solid #e6e6e6;
  border-radius: 9px;
  font-weight: bold;

  display : block;

  ${props => props.char === 'logo' && { width: 40, border: 0 }}
  
  &:hover{
    background-color: #464646;
    color: white;
    border: 0;
    transition: 0.6s;
  }
`

const LoginButton = styled.button`
  background: inherit ; box-shadow:none; padding:0; overflow:visible; cursor:pointer;

  width : 60px;
  height : 30px;

  border : 0;
  border-radius: 6px;
  outline: 0;
  color: white;
  font-weight: bold;
  font-size: 14px;
  
  background-color: #49add8;

  &:hover {
    background-color: #464646;
    color: white;
    transition: 0.6s;
  }
`

