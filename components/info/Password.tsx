import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import styled from 'styled-components';

export default function Password() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  let emailAuthKey = '';

  const router = useRouter();
  
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: email,
      validationKey: emailAuthKey,
    }
    // console.log(data.validationKey);
    try {
      const respone = await axios.post('https://minesweeper.hanjoon.dev/minesweeper/gamer/validation', data)
      // console.log(respone);
      if (respone.data) {
        router.push('/');
      }
    } catch (e) {
      // console.log(e);
    }
  }

  const emailChangedHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);  
  }

  const emailAuthSubmit = async () => {
    if (!emailRegExp.test(email)) {
      setError('ID를 확인해주세요.')
      return;
    } else {
      setError('');
    }
    const data = {
      email: email,
    }
    await axios.patch('https://minesweeper.hanjoon.dev/minesweeper/gamer/validation', data)
    // console.log(respone);
  }

  const AuthNumberHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = e;
    emailAuthKey = value;
    // console.log(emailAuthKey)
  }

  return (
    <StyleForm onSubmit={onSubmit}>
      <PasswordAuthEmailBox>
        <PasswordAuthEmailName>ID</PasswordAuthEmailName>
        <PasswordAuthEmailInput
          type='email'
          required
          placeholder='Email을 입력해주세요'
          onChange={emailChangedHandler}
        />
        <PasswordAuthEmailAuthBtn type='button' value='이메일 인증' onClick={emailAuthSubmit} />
      </PasswordAuthEmailBox>
      {error && <ErrorSpan className='authError'>{error}</ErrorSpan>}
      <PasswordAuthNumBox>
        <PasswordAuthNumName>인증번호</PasswordAuthNumName>
        <PasswordAuthNumInput type='text' required placeholder='인증번호를 입력해주세요' onChange={AuthNumberHandler}/>
      </PasswordAuthNumBox>
      <PaaswordAuthSubmitBtn type='submit' value='완료' />
    </StyleForm>
  )
}
const StyleForm = styled.form`
  width: 100%;
  max-width: 400px;
  height: 150px;
  
  border: 2px solid #e6e6e6;
  border-radius: 15px;

  margin: 0 auto;
  padding: 10px;
  
  position: relative;
  top: 150px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
    padding: 0;
    box-sizing: border-box;
  }
  
`
const PasswordAuthEmailBox = styled.div`
  width: 100%;

  margin-bottom: 15px;
`;
const PasswordAuthEmailName = styled.span`
  width: 80px;

  display: inline-block;
`;

const PasswordAuthEmailInput = styled.input`
  width: 200px;
  height: 25px;
  border: 2px solid #e6e6e6;
  border-radius: 8px;
`;

const PasswordAuthEmailAuthBtn = styled.input`
  width: 100px;
  height: 25px;
  border: 2px solid #e6e6e6;
  border-radius: 8px;

  margin-left: 10px;
  
  background-color: #fff;


  display: inline-block;
  cursor: pointer;
  &:hover {
    background-color: #464646;
    color:#fff;
  }
`;

const PasswordAuthNumBox = styled.div`
  width: 100%;
`;

const PasswordAuthNumName = styled.span`
  width: 80px;

  display: inline-block;
`;

const PasswordAuthNumInput = styled.input`
  width: 200px;
  height: 25px;
  border: 2px solid #e6e6e6;
  border-radius: 8px;
`;

const PaaswordAuthSubmitBtn = styled.input`
  width: 120px;
  height: 25px;
  border: 2px solid #e6e6e6;
  border-radius: 8px;

  margin: 15px auto;

  background-color: #fff;

  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #464646;
    color:#fff;
  }
`;

const ErrorSpan = styled.span`
  color: tomato;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;