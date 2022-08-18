import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function MyPage () {


  const onSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    
    console.log(sessionStorage.getItem('gamerId'))
  }

  const onSubmit2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('wait')
    await axios.get('http://34.168.232.38:8080/minesweeper/gamer/email/abcd@naver.com').then(res => {
     
      console.log(res.data)
   
    })
  }

  const onPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('wait')
    const data = {
      email : "abc@naver.com",
      name : '홍길동',
      password : '1234'
    }
    await axios.post(`http://34.168.232.38:8080/minesweeper/gamer/`, data).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }

  return (
    <MyPageSection>
      <MyPageItem onClick={onSubmit}>
        나의 이전 플레이
      </MyPageItem>
      <MyPageItem>
        나의 업적 등등
        <button onClick={onSubmit2}>get</button>
        <button onClick={onPost}>post</button>
      </MyPageItem>


    </MyPageSection>

  )

}

const MyPageSection = styled.section`
  width : 50%;
  height : 600px;
  border : 1px solid;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 30px;

  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const MyPageItem = styled.div`
  width : 400px;
  height : 250px;
  border : 1px solid;

  
`