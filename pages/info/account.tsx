import React from 'react'
import styled from 'styled-components';


function Account() {

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <StyleForm onSubmit={onSubmit}>
      <div><span>ID</span><input type='email' required placeholder='Email을 입력해주세요' /><button>이메일인증</button></div>
      <div><span>인증번호</span><input type='text' required /></div>
      <div><span>패스워드</span><input type='password' required placeholder='비밀번호를 입력해주세요' /></div>
      <div><span>닉네임</span><input type='text' required placeholder='닉네임' /></div>
      <div><input type='submit' value='회원가입' /></div>
    </StyleForm>
  )
}


const StyleForm = styled.form`
  width: 100%;
  max-width: 500px;
  
  border: 1px solid black;

  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 10px;
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
    
    padding: 0;
  }
  div:nth-child(5) {
    width: 150px;

    margin: 0 auto;
    input { 
      width: 100%;
    }
  }
`;
export default Account
