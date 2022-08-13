import React from "react";
import Link from "next/link";
import styled from "styled-components";

export default function AccountBox () {

  return (
    <StyleSection>
      <Link href="/info/loginPage">
        <AccountButton>로그인</AccountButton>
      </Link>
      <Link href="/info/accountPage">
        <AccountButton>회원가입</AccountButton>
      </Link>
    </StyleSection>
  )
}

const StyleSection = styled.section`
  width : 150px;

  position: relative;
  left : 50%;
  transform: translateX(-50%);
  top: 100px;
  
  display: flex;
  justify-content: space-between;
`

const AccountButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 70px;
  border : 1px solid;
  border-radius: 10px;
`

