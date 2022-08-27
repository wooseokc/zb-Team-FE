import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { DiffContext } from "../../src/store/diff";

export default function AccountBox () {
  let storeWidth : number = useContext(DiffContext).diff.width
  return (
    <StyleSection width={storeWidth}>
      <Link href="/info/loginPage">
        <AccountButton width={storeWidth}>로그인</AccountButton>
      </Link>
      <Link href="/info/accountPage">
        <AccountButton width={storeWidth}>회원가입</AccountButton>
      </Link>
    </StyleSection>
  )
}

const StyleSection = styled.section<{width : number}>`
  width : ${props => `${props.width/5}px`};
  height: ${props => `${props.width/50}px`};;

  
  min-width: 250px;
  min-height: 25px;
  max-width: 350px;
  max-height: 35px;

  position: relative;
  left : 50%;
  transform: translateX(-50%);
  top: ${props => `${props.width/17}px`};
  ${props => props.width >= 3000 && {top : 140}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {top : `${props.width/30}px`}};
  ${props => props.width < 1250 && {top : 70}};
  
  display: flex;
  justify-content: space-between;

  margin-bottom: 200px;
`

const AccountButton = styled.button<{width : number}>`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 48%;
  ${props => props.width >= 3000 && {height : 60}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {height :  `${props.width/50}px`}};
  ${props => props.width < 1250 && {height : 30}};

  border : 2px solid #3399c5;
  ${props => props.width >= 3000 && {paddingBottom : 10}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {paddingBottom :  `${props.width/400}px`}};
  ${props => props.width < 1250 && {paddingBottom : 4}};
  border-radius: 10px;

  font-size: ${props => `${props.width/100}px`};  
  ${props => props.width >= 3000 && {fontSize : 25}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize :  `${props.width/100}px`}};
  ${props => props.width < 1250 && {fontSize : 16}};

  :hover {
    font-weight: 900;
  }
`

