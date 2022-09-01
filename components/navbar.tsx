/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { setAuthToken } from './info/_helpers/setAuthToken'
import { DiffContext } from '../src/store/diff'
import { debounce } from 'lodash'

export default function Navbar() {
  const [tokenIs, setTokenIs] = useState<boolean>(false) 
  const [UI, setUI] = useState(false)
  const widthDispatch : any = useContext(DiffContext).Widthdispatch
  const storeWidth : number = useContext(DiffContext).width.width


  useEffect(() => {
    let token: string | null = null
    if (localStorage.getItem('accessToken')) {
      setTokenIs(true)
      token = localStorage.getItem('accessToken');
    } else if (localStorage.getItem('accessToken') === 'undefined') {
      setTokenIs(false)
    } else {
      setTokenIs(false)
    }
    if (token !== null) {
      setAuthToken(token)
    }
    
  })

  useEffect(() => {
    const widthHandle = debounce(() => {
      if (UI) {
        widthDispatch({type : 'changeWidth', number : window.innerWidth})
      } else {
        widthDispatch({type : 'changeWidth', number : 1250})
      }

    }, 100)

    window.addEventListener('resize' , widthHandle)
    return () => window.removeEventListener('resize' , widthHandle)
  }, [storeWidth])
  /** */
  useEffect(() => {
    const token = {
      accessToken : localStorage.getItem('accessToken'),
      refreshToken : localStorage.getItem('refreshToken')
    }
    async function reissue() {
      await axios.post('https://minesweeper.hanjoon.dev/minesweeper/auth/reissue', JSON.stringify(token), {
        headers : {'content-type': 'application/json'},
      })
      .then(res => {
        
          let data = res.data;
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
          sessionStorage.setItem('gamerId', data.gamerId)
      })
      .catch(err => {
        console.log(err.response)
        let error = err.response
        if (error.status === 400) {
          localStorage.clear()
          sessionStorage.clear()
          setTokenIs(false)
        }
      })
    }

    const refresh = localStorage.getItem('refreshToken')
    if (refresh) {
      reissue()
    }

    if (sessionStorage.getItem('uistatus') === 'off') {
      setUI(false)
      widthDispatch({type : 'changeWidth', number : 1250})
    } else if (sessionStorage.getItem('uistatus') === 'on') {
      setUI(true)
      widthDispatch({type : 'changeWidth', number : window.innerWidth})
    }
  }, [])


  const logOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      "accessToken": localStorage.getItem('accessToken'),
      "refreshToken": localStorage.getItem('refreshToken')
    }
    console.log(JSON.stringify(data))
    await axios.post('https://minesweeper.hanjoon.dev/minesweeper/auth/logout', data, {
      headers : {'content-type': 'application/json'},
    }).then((res)=> {
      console.log(res)
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = '/';
    })
  }

  const UIstatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('yeah')
    if (UI) {
      sessionStorage.setItem('uistatus', 'off')
      window.location.href = '/';

    } else {
      sessionStorage.setItem('uistatus', 'on')
      window.location.href = '/'; 
    } 
  }


  


  return (
    <>
    <NavBox width={storeWidth}>
      <Link href="/">
        <NavButton width={storeWidth} char='logo'>
          <img src='/free-icon-bomb.png' alt='bomlogo' width='40' height="40"/>
        </NavButton>
      </Link>
      <NavListBox>
        <Link href="/board/list">
          <NavButton width={storeWidth}>채팅하기</NavButton>
        </Link>
        <Link href="/board/rank">
          <NavButton width={storeWidth}>랭킹보기</NavButton>
        </Link>
        <Link href="/info/mypage">
          <NavButton width={storeWidth}>마이페이지</NavButton>
        </Link>
      </NavListBox>
      {tokenIs ? <LogOutButton width={storeWidth} onClick={logOut}> Log out</LogOutButton> : 
      <Link href="/info/loginPage">
        <LoginButton width={storeWidth}>Log in</LoginButton>
      </Link> }

      <UIcontext onClick={UIstatus} width={storeWidth}>UI 최적화 : {UI ? <UIStatus> On </UIStatus>  : <UIStatus style={{color: 'black'}}> Off</UIStatus> } </UIcontext>
    </NavBox>
    </>
  )
}

const NavBox = styled.nav<{width : number}>`
  width : ${props => `${props.width/2.5}px`};
  min-width: 500px;
  max-width: 1000px;
  height: ${props => `${props.width/45}px`};
  min-height: 40px;
  max-height: 80px;
  position : relative;
  left: 50%;
  transform: translateX(-50%);

  display : flex;
  align-items: center;
`

const NavListBox = styled.div`
  width : 100%;
  height: 100%;

  display : flex;
  justify-content: space-evenly;
  

`

const NavButton = styled.button<{char? : string, width : number}>`
  background: inherit ; box-shadow:none;  padding:0; overflow:visible; cursor:pointer;

  width : 23%;

  border : 2px solid #e6e6e6;
  border-radius: 9px;
  font-weight: bold;

  font-size: ${props => props.width <= 3000 ? `${props.width/110}px` : `30px`};

  display : block;

  ${props => props.char === 'logo' && { width: 40, border: 0 }}
  
  &:hover{
    background-color: #464646;
    color: white;
    border: 0;
    transition: 0.6s;
  }
`

const LoginButton = styled.button<{width : number}>`
  background: inherit ; box-shadow:none; padding:0; overflow:visible; cursor:pointer;

  width: 15%;
  min-width : 70px;
  height: 100%;
  border : 0;
  border-radius: 6px;
  outline: 0;
  color: white;
  font-weight: bold;
  font-size: ${props => props.width <= 3000 ? `${props.width/110}px` : `30px`};
  
  
  background-color: #49add8;

  &:hover {
    background-color: #464646;
    color: white;
    transition: 0.6s;
  }
`

const LogOutButton = styled.button<{width : number}>`
  background: inherit ; box-shadow:none; padding:0; overflow:visible; cursor:pointer;
  width: 15%;
  height: 100%;
  min-width : 70px;
  
  border : 0;
  border-radius: 6px;
  white-space: nowrap;
  outline: 0;
  font-size: ${props => props.width <= 2500 ? `${props.width/120}px` : `27px`};
  
  padding: 5px;
  
  color: white;
  font-weight: bold;
  
  
  background-color: #49add8;

  &:hover {
    background-color: #464646;
    color: white;
    transition: 0.6s;
  }
`

const UIcontext = styled.button<{width : number}>`
  background: inherit ; box-shadow:none; padding:0; overflow:visible; cursor:pointer;


  position: absolute;
  right: ${props => props.width <= 3000 ? `-20%` : `-25%`};
  width: 20%;
  min-width : 70px;
  height: 100%;
  border : 0;
  border-radius: 6px;
  outline: 0;
  font-weight: bold;
  font-size: ${props => props.width <= 3000 ? `${props.width/110}px` : `30px`};
`

const UIStatus = styled.div`
  display: inline;

  color : red

`
