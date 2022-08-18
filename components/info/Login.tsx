import React, { useState } from "react";
import Link  from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import { setAuthToken } from './_helpers/setAuthToken';


export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [error, setError] = useState('');

  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(loginId.length);
    if (loginId.length < 5 || !regExp.test(loginId)) {
      setError('ID를 확인 해주세요.')
    } else {
      try {
        const loginPayload = {
        'email': loginId,
        'password': loginPw,
        };

        await axios
          .post('http://34.168.232.38:8080/minesweeper/auth/login', loginPayload)
          .then((response) => {
            const token = response.data.token;

            // JWT 토큰 로컬에 저장
            localStorage.setItem('token', token);

            setAuthToken(token);

            window.location.href = '/';
          })
      } catch(error) {
        setError('ID와 PASSWORD를 확인 해주세요');
      }
      
    }  

  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === 'email') {
      setLoginId(e.currentTarget.value);  
    } else if (e.currentTarget.type === 'password') {
      setLoginPw(e.currentTarget.value);
    }
    
  }

  return (
    <StyleForm onSubmit={onSubmit}>
      <InputBox>
        <InputBoxText>ID</InputBoxText>
        <LoginInput
          type='email'
          value={loginId}
          onChange={onChange}
          autoComplete='username'
          required
          placeholder='Email을 입력해주세요'
        />
      </InputBox>
      {error && <ErrorSpan className='authError'>{error}</ErrorSpan>}
      <InputBox>
        <InputBoxText>PASSWORD</InputBoxText>
        <LoginInput
          type='password'
          value={loginPw}
          onChange={onChange}
          autoComplete='current-password'
          required
          placeholder='비밀번호를 입력해주세요'
        />
      </InputBox>
      <Link href="/info/passwordPage" passHref>
        <SytledLink>비밀번호 찾기</SytledLink>
      </Link>
      <InputBox><SubmitBtn type='submit' value='로그인' /></InputBox>
    </StyleForm>
  )
}


const StyleForm = styled.form`
  width: 100%;
  max-width: 400px;
  
  border: 2px solid #e6e6e6;

  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 10px;

`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const InputBoxText = styled.span`
  width: 100px;
  font-weight: bold;
  text-align: center;

  display: inline-block;
`;

const SytledLink = styled.a`
  width: 150px;
  height: 25px;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
  box-sizing: border-box;
    
  cursor: pointer;

  margin: 0 auto;
  &:link {
    color: black;
    text-decoration: none;
  }

  &:visited {
    color: black;
    text-decoration: none;
  }
  &:hover {
    color: white;
    font-weight: bold;
    border: 1px solid #e6e6e6;
    background-color: #464646;
    transition: 0.8s;
  }
`;

const LoginInput = styled.input`
  height: 25px;
  border: 2px solid #e6e6e6;
  outline: 0;
  box-sizing: border-box;
    
  padding: 2px;
`;

const SubmitBtn = styled.input`
    width: 100px;
    height: 30px;
    border: 2px solid #e6e6e6;
    border-radius: 6px;
    font-weight: bold;
    font-size: 16px;
    background-color: transparent;
    
    cursor: pointer;

    padding: 0;
    margin: 0 auto;
    &:hover {
      background-color: #464646;
      color: white;
      transition: 0.8s;
    }
`;


const ErrorSpan = styled.span`
  color: tomato;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;