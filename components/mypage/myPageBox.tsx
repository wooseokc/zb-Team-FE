import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function MyPage () {


  const onSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    
    let a = JSON.parse("[[1,34,[34]],[1,41,[41]],[1,75,[75,64,53,42,43,32,21,10,11,12,20,30,31,22,13,2,3,4,14,23,24,33,44,35,45,36,46,37,26,27,28,38,29,39,48,47,56,55,54,63,52,62,72,73,74,65,66,57,58,49,59,68,69,67,76,77,85,86,87,95,96,97,88,98,89,99,83,84,82]],[2,78,[78]],[2,94,[94]],[2,94,[94]],[2,94,[94]],[1,83,[92,93]],[2,51,[51]],[1,52,[61]],[1,61,[50,60,70,71]],[2,40,[40]],[2,81,[81]],[1,71,[80]],[1,80,[90,91]],[2,25,[25]],[2,1,[1]],[1,11,[0]],[2,15,[15]],[1,4,[5]],[1,5,[6,16]],[1,16,[7,17]],[2,18,[18]],[1,17,[8]],[1,8,[9,19]]]")
    console.log(a)
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