/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';

export default function MyPage () {
  const [listItems, setListItems] = useState<JSX.Element>()
  const router = useRouter()
  useEffect(() => {
    let list; 
    if (sessionStorage.getItem('gamerId')) {
      let gamerId = sessionStorage.getItem('gamerId')
      axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/list/${gamerId}`).then(res => {
        console.log(res.data)

        list = new Array(res.data.gameList.length)
        for (let i = 0; i < list.length ; i ++) {
          let tmpArr = [res.data['createdAtList'][i], res.data['difficultyList'][i], res.data['timeList'][i], res.data['gameList'][i]];
          list[i] = tmpArr.slice()
        }

        let lists = list.map((items, idx) => {
          const createdAt : string = items[0] 
          const difficulty : string = items[1]
          const gameId : string = items[3]

          const splitWithT = createdAt.split('T');
          const splitWithDate = splitWithT[0].split('-')
          const Hour = splitWithT[1].split(':')[0]
          const Minute = splitWithT[1].split(':')[1]


          return (
            <GameButton key={gameId} value={gameId} onClick={goToGame}>{'< '} {splitWithDate[0]}년 {splitWithDate[1]}월 {splitWithDate[2]}일 {Hour}시 {Minute}분 {'>'} 　　난이도 : {difficulty} </GameButton>
          )
        })

        setListItems(lists)

        console.log(list)
     
      }).catch(() => {
        console.log('err')
      })
  
  
    } else {
      console.log('no Id')
    }

  }, [])





  const goToGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value =  e.currentTarget.value
    router.push(`/info/mylastgame/${value}`)
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    console.log(sessionStorage.getItem('gamerId'))
    console.log(localStorage.getItem('accessToken'))
    console.log(localStorage.getItem('refreshToken'))
    console.log(localStorage)
  }

  const onSubmit2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('wait')
    await axios.get('https://minesweeper.hanjoon.dev/minesweeper/gamer/email/abcd@naver.com').then(res => {
     
      console.log(res.data)
   
    })
  }

  const onPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('wait')
    const data = {
      email : "abcdeeeee@naver.com",
      name : '테스트',
      password : '1234'
    }
    await axios.post(`https://minesweeper.hanjoon.dev/minesweeper/gamer`, (data)).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }

  const clearStore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.clear()
    sessionStorage.clear()
  }
  const ListGet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let gamerId = sessionStorage.getItem('gamerId')
    console.log(gamerId)

    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/list/${gamerId}`).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }


  const GameGet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let gamerId = sessionStorage.getItem('gamerId')
    console.log(gamerId)

    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/15`).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }

  return (
    <MyPageSection>
      <PageInfo >나의과거게임</PageInfo>
      <MyPageItem char={'game'}>
        
        {listItems}
      </MyPageItem>
      <PageInfo>나의 업적</PageInfo>
      <MyPageItem char ={'carrer'}>
        
        <button onClick={onSubmit}>stroge</button>
        <button onClick={onSubmit2}>get</button>
        <button onClick={onPost}>post</button>
        <button onClick={clearStore}>clear</button>
        <button onClick={ListGet}>List</button>
        <button onClick={GameGet}>gmaeGet</button>

      </MyPageItem>


    </MyPageSection>

  )

}

const MyPageSection = styled.section`
  width : 50%;
  height : 620px;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 30px;

  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const PageInfo = styled.p`
  margin: 0;
`

const MyPageItem = styled.div<{char : string}>`
  width : 400px;
  height : ${props => props.char === 'game' ? '320px' : '150px'};
  border : 2px solid #3399c5;
  border-radius: 20px;

  padding: 20px;

  position: relative;
  top : 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const GameButton = styled.button`
  width: 350px;
  margin-top: 5px;
  background: #76c5da;
  
  border: 0px;
  border-radius: 5px;
  padding: 2px;
  padding-left : 10px;
  padding-right: 10px;
  height: 25px;
  font-size: 12px;

  :hover {
    background: #215c6c;
  }
`