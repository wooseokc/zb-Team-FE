import React from "react";
import styled from 'styled-components';
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

export default function emailAuthPage () {

  return (
    <>
      <AccountDivBox>
        <AccountTextBox>인증번호</AccountTextBox>
        <StyledInput type='text' required />
      </AccountDivBox>
    </>
  )
}

emailAuthPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

const AccountDivBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  .emailBtn {
    width: 80px;
    cursor: pointer;

    margin-left: 10px;
  }
      `;

const AccountTextBox = styled.span`
  width: 100px;

  display: inline-block;
        `;

const StyledInput = styled.input`
  width: 200px;
  height: 25px;
  box-sizing: border-box;
    
  padding: 0;
`;