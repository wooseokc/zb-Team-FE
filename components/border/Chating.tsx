/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ws } from './chat/Chathook';
import axios from 'axios';

//https://minesweeper.hanjoon.dev/minesweeper/stomp/chat
//subscribe('/topic/lobby'
// /pub/lobby

function Chating() {
  const [text, setText] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [message, setMessage] = useState<{ name: string; message: string }[]>(
    []
  );
  const [joinUsers, setJoinUsers] = useState<number>(0);
  const scrollRef = useRef();
  const [lastIndex, setLastIndex] = useState<number>(0);
  let gameName: string | null = '';
  if (typeof window !== 'undefined') {
    gameName = sessionStorage.getItem('gamerName');
  }
  // const url = 'https://minesweeper.hanjoon.dev/minesweeper/stomp/chat'
  // let sock = new SockJS(url);
  // let ws = Stomp.over(sock);

  const inputNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nickname) {
      e.target.disabled = !e.target.disabled;
    }
  };

  ws.onConnect = () => {
    ws.subscribe('/topic/lobby', (data) => {
      const res = JSON.parse(data.body);
      // console.log(res.name, 'nick'+nickname);
      setMessage((prev) => [...prev, { name: res.name, message: res.message }]);
    });
    ws.subscribe('/topic/lobbyUsers', (data) => {
      const res = JSON.parse(data.body);
      console.log(res);
      setJoinUsers(res);
    });
  };

  useEffect(() => {
    const chatdata = async () => {
      const res = await axios.get(
        'https://minesweeper.hanjoon.dev/minesweeper/chat-lobby/'
      );
      setLastIndex(res.data.lastIndex);

      if (res) {
        res.data.chatList.map(
          (item: { name: string; message: string }): boolean => {
            setMessage((prev) => [
              ...prev,
              { name: item.name, message: item.message },
            ]);
            return true;
          }
        );
      }
    };
    chatdata();

    if (gameName) {
      setNickname(gameName);
    }
    ws.activate();
    return () => {
      ws.deactivate();
    };
  }, []);

  useEffect(() => {
    const current: any = scrollRef.current;
    current.scrollTop = current.scrollHeight;
  }, [message]);

  const send = (data: { name: string; message: string }) => {
    if (ws.connected) {
      ws.publish({
        destination: '/pub/lobby',
        body: JSON.stringify({ name: data.name, message: data.message }),
      });
    }
  };

  const oldchatdata = async () => {
    const res = await axios.get(
      `https://minesweeper.hanjoon.dev/minesweeper/chat-lobby/${lastIndex}`
    );
    console.log(res);
    if (res) {
      res.data.chatList.map(
        (item: { name: string; message: string }): boolean => {
          setMessage((prev) => [
            { name: item.name, message: item.message },
            ...prev,
          ]);
          return true;
        }
      );
    }
    if (lastIndex >= 0) {
      setLastIndex((prev) => (prev -= 31));
    }
  };

  const onScroll = (e) => {
    console.log(e.target.scrollTop);
    console.log(lastIndex);
    if (e.target.scrollTop < 1) {
      oldchatdata();
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: nickname,
      message: text,
    };
    // setMessage([...message, data])
    send(data);
    setText('');
  };

  return (
    <ChatContainer>
      <JoinUsers>동시 접속자 : {joinUsers}</JoinUsers>
      <ChatingBox ref={scrollRef} onScroll={onScroll}>
        {message.map<ReactElement>((item, idx) => (
          <li key={idx}>
            <NicknameSpan>{item.name} :</NicknameSpan>
            {item.message}
          </li>
        ))}
      </ChatingBox>
      <Inputform onSubmit={submit}>
        {gameName ? (
          <InputText type='text' id='nickname' disabled value={nickname} />
        ) : (
          <InputText
            type='text'
            id='nickname'
            maxLength={10}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={inputNick}
            value={nickname}
            autoFocus
            required
          />
        )}

        <InputText
          type='text'
          id='message'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <TextSubmit type='submit' value='전송' />
      </Inputform>
    </ChatContainer>
  );
}

export default Chating;

const ChatContainer = styled.div`
  width: 30vw;

  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const JoinUsers = styled.div`
  width: 100%;

  margin-top: 30px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ChatingBox = styled.ul<{ ref: any }>`
  width: 100%;
  min-width: 300px;
  height: 100%;

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
  &::-webkit-scrollbar-thumb {
    background-color: #464646;
    border-radius: 10px;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }
`;

const Inputform = styled.form`
  width: 100%;

  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NicknameSpan = styled.span`
  width: 90px;
  display: inline-block;

  font-size: 0.8rem;
`;
const InputText = styled.input`
  width: ${(props) => (props.id === 'nickname' ? '20' : '70')}%;

  box-sizing: border-box;
`;
const TextSubmit = styled.input`
  width: 10%;

  padding: 1px 2px;

  text-align: center;
`;
