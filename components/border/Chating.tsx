import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components';
import io from 'socket.io-client';

function Chating() {
  const [text, setText] = useState<string>('');
  const [nickname, setNickname] = useState<string>('test');
  const [message, setMessage] = useState<string[]>([])



  const submit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage([...message, text])
    setText('');
    const target = e.target as HTMLElement
    if (target.previousSibling) {
      const element = target.previousSibling
      const ele = await element as HTMLElement;
      ele.scrollTop = ele.scrollHeight - ele.clientHeight;
    }
  }
  

  return (
    <>
      <ChatingBox>
        {message.map<ReactElement>((item, idx) => (
          
            <li key={idx}>
              <NicknameSpan >{nickname} :</NicknameSpan>{item}
            </li>
          
        ))}
      </ChatingBox>
      <Inputform onSubmit={submit}>
        <InputText type='text' id='inputText' onChange={(e) => setText(e.target.value)} value={text} autoFocus />
        <TextSubmit type='submit' value='작성하기'/>
      </Inputform>
    </>
  )
}

export default Chating

const ChatingBox = styled.ul`
  width: 500px;
  height: 500px;

  border: 2px solid #e6e6e6;
  border-radius: 15px;
  
  margin: 0 auto;
  margin-top: 50px;
  padding: 0;

  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 15px;
    background-color: #e6e6e6;
    
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb{
    background-color:#464646;
    border-radius: 10px;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }
`;

const Inputform = styled.form`
  width: 500px;

  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NicknameSpan = styled.span`
  width: 100px;
  display: inline-block;
`;
const InputText = styled.input`
  width: 400px;
`;
const TextSubmit = styled.input`
  width: 100px;
`;