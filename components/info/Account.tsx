import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styled from 'styled-components';



export default function Account() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [emailResult, setEmailResult] =useState<boolean>(false);
  const [error, setError] = useState<string>('');
  

  //email 인증 이벤트
  const emailAuthentication = async () => {
    // console.log(email);
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email.length < 5 || !regExp.test(email)) {
      setError('ID를 확인 해주세요.');
    } else {
      const response = await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/gamer/email/${email}`) 
      if (response.data) {
        setEmailResult(prev => !prev);
        console.log(response.data)
      } else {
        setError('해당 ID가 존재합니다.')
        console.log(response.data);
      }
    }
  }
  
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const infoData = {
      email,
      name: nickName,
      password,
    };
    try {
      const respone = await axios.post(`https://minesweeper.hanjoon.dev/minesweeper/gamer/`, infoData)
      console.log(respone);
      router.push('/info/emailAuthPage')
      sessionStorage.setItem('email', email);
    } catch (e) {
      console.log(e);
    }
  }

  //email 정보 저장 이벤트
  const inputData = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { type, value, name } } = e;
    
    if (type === 'email') {
      setEmail(value);
    } else if (type === 'password') {
      setPassword(value);
    } else if (name === 'nickName') {
      setNickName(value);
    }
  }
  return (
    <StyleForm onSubmit={onSubmit}>
      <AccountDivBox>
        <AccountTextBox>ID</AccountTextBox>
        {!emailResult
          ? <StyledInput type='email' required placeholder='Email을 입력해주세요' onChange={inputData} />
          : <ReadOnlyInput type='email' required value={email} onChange={inputData} readOnly />
        }
        <StyledInput className='emailBtn' type='button' value='중복확인' onClick={emailAuthentication} />
      </AccountDivBox>
      {error && <ErrorSpan className='authError'>{error}</ErrorSpan>}
      <AccountDivBox>
        <AccountTextBox>패스워드</AccountTextBox>
        <StyledInput type='password' value={password} required placeholder='비밀번호를 입력해주세요' onChange={inputData} />
      </AccountDivBox>
      <AccountDivBox>
        <AccountTextBox>닉네임</AccountTextBox>
        <StyledInput type='text' name='nickName' required placeholder='닉네임을 입력해주세요' onChange={inputData}/>
      </AccountDivBox>
      <AccountDivBox>
        {!emailResult
          ? <StyledSubmit type='submit' disabled value='회원가입' />
          : <StyledSubmit type='submit' value='회원가입' />
        }
      </AccountDivBox>
    </StyleForm>
  )
}

const StyleForm = styled.form`
  width: 100%;
  max-width: 400px;
  
  border: 2px solid #e6e6e6;
  border-radius: 10px;

  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 10px;

`;
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
const ReadOnlyInput = styled.input`
  width: 200px;
  height: 25px;
  box-sizing: border-box;

  background-color: #e6e6e6;
    
  padding: 0;
`;

const StyledSubmit = styled.input`
  width: 200px;
  height: 25px;
  box-sizing: border-box;
    
  padding: 0;
  margin: 0 auto;
`;

const ErrorSpan = styled.span`
  color: tomato;
  text-align: center;
  font-weight: bold;
  font-size: 12px;


`;