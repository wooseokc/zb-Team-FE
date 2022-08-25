/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';

export default function MyPage () {
  const [listItems, setListItems] = useState<JSX.Element[]>()
  const [loginStatus, setLoginStatus] = useState(true)
  const [carrer, setCarrer] = useState(
    {
      easyCleared : 0,
      easyRank: 0,
      easyTime: 0,
      hardCleared: 0,
      hardRank: 0,
      hardTime: 0,
      mediumCleared: 0,
      mediumRank: 0,
      mediumTime: 0
    }
  )
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setLoginStatus(false)
    }
    let gamerId = sessionStorage.getItem('gamerId')
    if (sessionStorage.getItem('gamerId') && loginStatus) {
      axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/stat/${gamerId}`).then(res => {
        let data = res.data

        setCarrer({
          easyCleared : data.easyCleared,
          easyRank: data.easyRank,
          easyTime: data.easyTime,
          hardCleared: data.hardCleared,
          hardRank: data.hardRank,
          hardTime: data.hardTime,
          mediumCleared: data.mediumCleared,
          mediumRank: data.mediumRank,
          mediumTime: data.mediumTime
        })
      })
    }

    let list; 
    if (sessionStorage.getItem('gamerId')) {
      axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/list/${gamerId}`).then(res => {

        list = new Array(res.data.gameList.length)
        for (let i = 0; i < list.length ; i ++) {
          let tmpArr = [res.data['createdAtList'][i], res.data['difficultyList'][i], res.data['timeList'][i], res.data['gameList'][i]];
          list[i] = tmpArr.slice()
        }

        let lists : JSX.Element[] = list.map((items, idx) => {
          const createdAt : string = items[0] 
          const difficulty : string = items[1]
          const gameId : string = items[3]
          let par : number =  +Date.parse(createdAt)

          let gap = new Date()
          let milliGap = gap.getTimezoneOffset()*60*1000;          
          par -= milliGap
          let local = new Date(par)
          const dateString = local.toLocaleString()

          let dateArr = dateString.split(' ')

          let timeArr = dateArr[4].split(':')

          return (
            <GameButton key={gameId} value={gameId} onClick={goToGame}>{'< '} {dateArr[0].slice(0, -1)}년 {dateArr[1].slice(0, -1)}월 {dateArr[2].slice(0, -1)}일 {dateArr[3] === '오후' ? +timeArr[0] + 12 : timeArr[0]}시 {timeArr[1]}분 {'>'} 　　난이도 : {difficulty} </GameButton>
          )
        })

        setListItems(lists)

     
      }).catch(() => {
        console.error('err')
      })
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

  const clearStore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.clear()
    sessionStorage.clear()
  }



  return (
    <MyPageSection>
      <PageInfo >나의과거게임</PageInfo>
      <MyPageItem char={'game'}>       
        {listItems}
        {(!loginStatus) && 
          <WaringText>로그인을 안하면 브라우저를 종료하기 전까지의 결과만 다시 볼 수 있습니다</WaringText>
        }
      </MyPageItem>
      <PageInfo>나의 업적
      <button onClick={onSubmit}>stroge</button>
        <button onClick={clearStore}>clear</button>

      </PageInfo>
      <MyPageItem char ={'carrer'}>
        {loginStatus ?
          <>
            <CarrerBox>초급
              <InfoBox>
                <CarrerItem>통산 성공 : {carrer.easyCleared}</CarrerItem>
                <CarrerItem>최고 기록 : {Math.floor(carrer.easyTime / 60000)}분 {((carrer.easyTime % 60000)/1000).toFixed(3)}초 </CarrerItem>
                <CarrerItem>최고 랭킹 : {carrer.easyRank} </CarrerItem>
              </InfoBox>
            </CarrerBox>
            <CarrerBox>중급
              <InfoBox>
                <CarrerItem>통산 성공 : {carrer.mediumCleared}</CarrerItem>
                <CarrerItem>최고 기록 : {Math.floor(carrer.mediumTime / 60000)}분 {((carrer.mediumTime % 60000)/1000).toFixed(3)}초</CarrerItem>
                <CarrerItem>최고 랭킹 : {carrer.mediumRank} </CarrerItem>
              </InfoBox>
            </CarrerBox>
            <CarrerBox>고급
              <InfoBox>
                <CarrerItem>통산 성공 : {carrer.hardCleared} </CarrerItem>
                <CarrerItem>최고 기록 : {Math.floor(carrer.hardTime / 60000)}분 {((carrer.hardTime % 60000)/1000).toFixed(3)}초</CarrerItem>
                <CarrerItem>최고 랭킹 : {carrer.hardRank} </CarrerItem>
              </InfoBox>
            </CarrerBox>
          </>
         :
          <WaringText2>로그인해야 볼 수 있어요</WaringText2>
         }
 
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
  top : 10px;

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
  height : ${props => props.char === 'game' ? '310px' : '150px'};
  border : 2px solid #3399c5;
  border-radius: 20px;

  padding: 15px;

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

const CarrerBox = styled.div`
  width : 90%;
  height : 100px;
  font-size : 15px ;
  font-weight: bold;

  text-align: center;

  margin-bottom: 10px;

`

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  position: relative;
  left: 50%;
  transform: translateX(-50%);
  bottom: -3px;
  
  padding: 2px;
`

const CarrerItem = styled.div`
  font-size: 13px;
`

const WaringText = styled.div`
  font-size: 10px;
  color : #de3535;

  position: absolute;
  top : 0px;
`
const WaringText2 = styled.div`
  font-size: 20px;
  color : #de3535;

  position: absolute;
  top : 70px;
`