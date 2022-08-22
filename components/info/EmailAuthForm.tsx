import axios from 'axios';
import {  useRouter } from 'next/router';
import React, { useState } from 'react'
import styled from 'styled-components'


function EmailAuthForm() {
  const [error, setError] = useState<string>('');
  // const tmpemail = 'eekimoon@naver.com'
  let email: string | null = '';
  let emailAuthKey: string | null = '';
  let router = useRouter();
  
  const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    email = sessionStorage.getItem('email');
    const data = {
      email: email,
      validationKey: emailAuthKey
    }
    try {
      const respone = await axios.post(`https://minesweeper.hanjoon.dev/minesweeper/gamer/validation`, data)
      if (respone.data) {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    }
  }

  const emailAuthResend = async () => {
    email = sessionStorage.getItem('email');
    try {
      const respone = await axios.patch(`https://minesweeper.hanjoon.dev/minesweeper/gamer/validation`, { 'email': email});
      console.log(respone)
      if (!respone.data) {
        setError('이메일을 확인해주세요.');
      }
      
    } catch (e) {
      console.error(e);
    }

  }

    const AuthNumberHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = e;
    emailAuthKey = value;
    // console.log(emailAuthKey)
  }

  return (
    <StyleForm onSubmit={onSubmit}>
      <EmailAuthNubmerBox>
        <EmailAuthNumberName>인증번호</EmailAuthNumberName>
        <EmailAuthNumberInput
          type='text'
          minLength={6}
          required
          placeholder='인증번호를 입력해주세요'
          onChange={AuthNumberHandler}
        />
      </EmailAuthNubmerBox>
      {error && <ErrorSpan className='authError'>{error}</ErrorSpan>}
      <EmailAuthNumberResendBtn onClick={emailAuthResend}>인증번호 재발송</EmailAuthNumberResendBtn>
      <EmailAuthNumberSubmit type='submit' value='인증하기' />
    </StyleForm>
  )
}

export default EmailAuthForm

const StyleForm = styled.form`
  width: 100%;
  max-width: 400px;
  height: 200px;
  border: 2px solid #e6e6e6;
  border-radius: 15px;
  
  margin: 0 auto;
  padding: 10px 10px;

  position: relative;
  top: 100px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const EmailAuthNubmerBox = styled.div`
  width:100%;
  height: 30px;
  
  margin-bottom: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const EmailAuthNumberName = styled.span`
  width: 100px;

  display: inline-block;
`;

const EmailAuthNumberInput = styled.input`
  width: 300px;
  border: 2px solid #e6e6e6;
  border-radius: 5px;

  padding: 3px;
`;

const EmailAuthNumberResendBtn = styled.button`
  width: 150px;
  border: 2px solid #e6e6e6;
  border-radius: 8px;

  margin: 0 auto;
  padding: 4px 0;
  
  background-color: #fff;
  cursor: pointer;
  transition: 0.5s ease-in-out;

  &:hover {
    background-color: #464646;
    color: #fff
  }


`;

const EmailAuthNumberSubmit = styled.input`
  width: 150px;
  height: 40px;
  border: 2px solid #e6e6e6;
  border-radius: 10px;

  margin: 0 auto;
  margin-top : 10px;


  background-color: #fff;
  cursor: pointer;
  transition: 0.5s ease-in;
  &:hover {
    background-color: #464646;
    color: #fff
  }
`;


const ErrorSpan = styled.span`
  color: tomato;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;
