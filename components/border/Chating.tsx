/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { ws } from './chat/Chathook';
// import axios from 'axios';


//https://minesweeper.hanjoon.dev/minesweeper/stomp/chat
//subscribe('/topic/lobby'
// /pub/lobby 

function Chating() {
  const [text, setText] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<{ name: string, message: string }[]>([]);
  const scrollRef = useRef();
  
  
  
  
  let gameName: string | null = '';
  if (typeof window !== 'undefined') {
    gameName = sessionStorage.getItem('gamerName')
  }
  // const url = 'https://minesweeper.hanjoon.dev/minesweeper/stomp/chat'
  // let sock = new SockJS(url);
  // let ws = Stomp.over(sock);
  
  const inputNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nickname) {
      e.target.disabled = !e.target.disabled;
    }
  }

  ws.onConnect = () => {
    ws.subscribe('/topic/lobby', (data) => {
      const res = JSON.parse(data.body);
      // console.log(res.name, 'nick'+nickname);
        setMessage(prev => [...prev, {name: res.name, message: res.message}])  
      
    })
  }
  
  useEffect(() => {
    // const chatdata = async () => {
    //   const res = await axios.get('https://minesweeper.hanjoon.dev/minesweeper/chat-lobby/')
    //   console.log(res);
    // }
    // chatdata();
    if (gameName) {
      setNickname(gameName);
    }
    ws.activate();
    return () => {
      ws.deactivate();
    }
  }, []);

  useEffect(() => {
    const current : any = scrollRef.current;
    current.scrollTop = current.scrollHeight;
  },[message])

  const send = (data: { name: string, message: string }) => {
    if (ws.connected) {
      
      ws.publish({
        destination: '/pub/lobby',
        body: JSON.stringify({ name: data.name, message: data.message }),
      });
    }
  
};
  

  const submit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: nickname,
      message: text
    }
    // setMessage([...message, data])
    send(data);
    setText('');
    
  }

  return (
    <>
      <ChatingBox ref={scrollRef}>
        {message.map<ReactElement>((item, idx) => (
          
            <li key={idx}>
              <NicknameSpan >{item.name} :</NicknameSpan>{item.message}
            </li>
          
        ))}
      </ChatingBox>
      <Inputform onSubmit={submit}>
        {gameName
          ? <InputText type='text' id='nickname' disabled value={nickname}  />
          : <InputText type='text' id='nickname' maxLength={10} onChange={e => setNickname(e.target.value)} onBlur={inputNick} value={nickname} autoFocus required />
        }
        
        <InputText type='text' id='message' onChange={(e) => setText(e.target.value)} value={text} />
        <TextSubmit type='submit' value='작성하기'/>
      </Inputform>
    </>
  )
}

export default Chating

const ChatingBox = styled.ul<{ref : any}>`
  width: 500px;
  height: 500px;

  border: 2px solid #e6e6e6;
  border-radius: 15px;
  
  margin: 0 auto;
  margin-top: 50px;
  padding: 0;

  display: flex;
  flex-direction: column;
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
  width: ${props => props.id === 'nickname' ? '100' : '300'}px;
  
  box-sizing: border-box;
`;
const TextSubmit = styled.input`
  width: 100px;
`;