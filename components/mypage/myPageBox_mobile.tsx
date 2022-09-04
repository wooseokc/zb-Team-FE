/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';
import { DiffContext } from "../../src/store/diff";

export default function MyPageMobile () {
  const storeWidth : number = useContext(DiffContext).width.width
  const [listItems, setListItems] = useState<JSX.Element[]>()
  const [loginStatus, setLoginStatus] = useState(true)
  const [admin, setAdmin] = useState(false)
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

        if (data.isAdmin) {
          setAdmin(true) 
        } else {
          setAdmin(false)
        }
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
            <GameButton width={storeWidth} key={gameId} value={gameId} onClick={goToGame}>{'< '} {dateArr[0].slice(0, -1)}년 {dateArr[1].slice(0, -1)}월 {dateArr[2].slice(0, -1)}일 {dateArr[3] === '오후' ? +timeArr[0] + 12 : timeArr[0]}시 {timeArr[1]}분 {'>'} 　　난이도 : {difficulty} </GameButton>
          )
        })

        setListItems(lists)

     
      }).catch(() => {
      })
    } 

    
  }, [])





  const goToGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value =  e.currentTarget.value
    router.push(`/info/mylastgame/${value}`)
  }

  const goToAdmin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/info/adminpage`)
  }




  return (
    <MyPageSection>
       {admin && <AdminButton onClick={goToAdmin}>관리자</AdminButton>}
      <PageInfo width={storeWidth}>나의과거게임</PageInfo>
      <MyPageItem  width={storeWidth} char={'game'}>       
        {listItems}
        {(!loginStatus) && 
          <WaringText width={storeWidth}>로그인을 안하면 브라우저를 종료하기 전까지의 결과만 다시 볼 수 있습니다</WaringText>
        }
      </MyPageItem>
      <PageInfo width={storeWidth}>나의 업적
      </PageInfo>
      <MyPageItem  width={storeWidth} char ={'carrer'}>
        {loginStatus ?
          <>
            <CarrerBox width={storeWidth}>초급
              <InfoBox width={storeWidth}>
                <CarrerItem>통산 성공 : {carrer.easyCleared}</CarrerItem>
                <CarrerItem>최고 기록 : {Math.floor(carrer.easyTime / 60000)}분 {((carrer.easyTime % 60000)/1000).toFixed(3)}초 </CarrerItem>
                <CarrerItem>최고 랭킹 : {carrer.easyRank} </CarrerItem>
              </InfoBox>
            </CarrerBox>
            <CarrerBox width={storeWidth}>중급
              <InfoBox width={storeWidth}>
                <CarrerItem>통산 성공 : {carrer.mediumCleared}</CarrerItem>
                <CarrerItem>최고 기록 : {Math.floor(carrer.mediumTime / 60000)}분 {((carrer.mediumTime % 60000)/1000).toFixed(3)}초</CarrerItem>
                <CarrerItem>최고 랭킹 : {carrer.mediumRank} </CarrerItem>
              </InfoBox>
            </CarrerBox>
            <CarrerBox width={storeWidth}>고급
              <InfoBox width={storeWidth}>
                <CarrerItem>통산 성공 : {carrer.hardCleared} </CarrerItem>
                <CarrerItem>최고 기록 : {Math.floor(carrer.hardTime / 60000)}분 {((carrer.hardTime % 60000)/1000).toFixed(3)}초</CarrerItem>
                <CarrerItem>최고 랭킹 : {carrer.hardRank} </CarrerItem>
              </InfoBox>
            </CarrerBox>
          </>
         :
          <WaringText2 width={storeWidth}>로그인해야 볼 수 있어요</WaringText2>
         }
 
      </MyPageItem>


    </MyPageSection>

  )

}

const MyPageSection = styled.section`
  width : 100%;



  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 10px;

  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const PageInfo = styled.p<{width : number}>`
  margin: 0;
  margin-top: 10px;
  font-size: 16px;
`

const MyPageItem = styled.div<{char : string, width : number}>`
  width : 80%;

  height: ${props => props.char === 'game' ? '400px' : '150px'};


  border : 2px solid #3399c5;
  border-radius: 20px;

  padding: 15px;

  position: relative;
  top : 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const GameButton = styled.button<{width : number}>`
  width: 90%;
  margin-top: 5px;
  background: #76c5da;
  
  border: 0px;
  border-radius: 5px;
  padding: 2px;
  padding-left : 10px;
  padding-right: 10px;
  height: 25px;
  min-height: 25px;
  max-height: 60px;
  font-size: 9px;

  :hover {
    background: #215c6c;
  }
`

const CarrerBox = styled.div<{width : number}>`
  width : 90%;
  font-size : 16px ;

  text-align: center;

  margin-bottom: 10px;

`

const InfoBox = styled.div<{width : number}>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  font-size: 11px;


  position: relative;
  left: 50%;
  transform: translateX(-50%);
  bottom: -3px;
  
  padding: 2px;
`

const CarrerItem = styled.div`

`

const WaringText = styled.div<{width : number}>`
  font-size: 10px;
  ${props => props.width >= 3000 && {fontSize : 24}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize :  `${props.width/125}px`}};
  ${props => props.width < 1250 && {fontSize : 10}};
  color : #de3535;

  position: absolute;
  top : 0px;
`
const WaringText2 = styled.div<{width : number}>`
  font-size: 20px;
  ${props => props.width >= 3000 && {fontSize : 48}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize :  `${props.width/62.5}px`}};
  ${props => props.width < 1250 && {fontSize : 20}};
  color : #de3535;

  position: absolute;
`

const AdminButton = styled.button`
  width : 100px;
  height: 20px;
  background-color: pink;

  position: absolute;
  left : 50%;
  bottom: -20px;

  cursor: pointer;
`