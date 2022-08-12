import React from "react";
import Link  from 'next/link';
import styled from 'styled-components';


export default function Login() {
  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <StyleForm onSubmit={onSubmit}>
      <div><span>ID</span><input type='email' required placeholder='Email을 입력해주세요' /></div>
      <div><span>패스워드</span><input type='password' required placeholder='비밀번호를 입력해주세요' /></div>
      <Link href="/info/password">비밀번호 찾기</Link>
      <div><input type='submit' value='로그인' /></div>
    </StyleForm>
  )
}


const StyleForm = styled.form`
  width: 100%;
  max-width: 400px;
  
  border: 1px solid black;

  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 10px;
  a {
    width: 150px;
    text-align: center;
    font-size: 14px;
    
    cursor: pointer;

    margin: 0 auto;
    
  }
  a:link {
    color:black;
    text-decoration: none;
  }
  a:visited {
    color:black;
    text-decoration: none;
  }
  div {
    
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  span {
    width: 100px;

    display: inline-block;
  }
  input {
    height: 25px;
    box-sizing: border-box;
    
    padding: 0;
  }
  div:nth-child(3) {
    width: 150px;

    margin: 0 auto;
    button { 
      width: 100%;
      background-color: #fff;
      outline: 0;
      border: 0;

      cursor: pointer;
    }
  }
  div:nth-child(4) {
    width: 150px;

    margin: 10px auto;
    input{
      width: 100%;

      cursor: pointer;
    }
  }
`;