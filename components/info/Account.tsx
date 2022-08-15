import React from 'react'
import styled from 'styled-components';



export default function Account() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <StyleForm onSubmit={onSubmit}>
      <div>
        <span>ID</span>
        <input type='email' required placeholder='Email을 입력해주세요' />
        <input className='emailBtn' type='button' value='이메일인증' />
      </div>
      <div><span>인증번호</span><input type='text' required /></div>
      <div><span>패스워드</span><input type='password' required placeholder='비밀번호를 입력해주세요' /></div>
      <div><span>닉네임</span><input type='text' required placeholder='닉네임' /></div>
      <div><input type='submit' value='회원가입' /></div>
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
  div {
    
    display: flex;
    align-items: center;
    margin: 10px 0;
    .emailBtn {
      cursor: pointer;

      margin-left: 10px;
    }
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
  div:nth-child(5) {
    width: 150px;

    margin: 0 auto;
    input { 
      width: 100%;

      cursor: pointer;
    }
  }
`;