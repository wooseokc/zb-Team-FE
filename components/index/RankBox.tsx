import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import styled from "styled-components";
import axios from "axios";
import { DiffContext } from "../../src/store/diff";

export default function RankBox () {
  // const [firstArr, setFirstArr] = useState<{ gamerId : number,
  //   gameId : number,
  //   name : string,
  //   ranking : number,
  //   time : number}[]>
  // ([])

  const [easy, setEasy] = useState<JSX.Element[]>([])
  const [medium, setMedium] = useState<JSX.Element[]>([])
  const [hard, setHard] = useState<JSX.Element[]>([])

  const rankdispatch : any = useContext(DiffContext).dispatch
  
  async function apiRankE () {
    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/gamer-ranking?difficulty=Easy&pageIdx=0&pageSize=3`).then(res => {
      let arr = res.data.contents
      setEasy(
        arr.map((item, idx) => {
          let rank : number = item.ranking
          let name : string = item.name
          let time : number = item.time
          let milli : number = time%1000;
          time = Math.floor(time / 1000);
          let sec : number = time % 60
          time = Math.floor(time/60);
          let min : number = time
          return (
            <RankItem key={rank} rankes={rank}>
              <RankNum rankes={rank}>{rank}</RankNum>
              <RankName>{name}</RankName>
              <RankTime>{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
            </RankItem>
          )
        })
      )
    })
  }
  async function apiRankM () {
    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/gamer-ranking?difficulty=Medium&pageIdx=0&pageSize=3`).then(res => {
      let arr = res.data.contents
      setMedium(
        arr.map((item, idx) => {
          let rank : number = item.ranking
          let name : string = item.name
          let time : number = item.time
          let milli : number = time%1000;
          time = Math.floor(time / 1000);
          let sec : number = time % 60
          time = Math.floor(time/60);
          let min : number = time
          return (
            <RankItem key={rank} rankes={rank}>
              <RankNum rankes={rank}>{rank}</RankNum>
              <RankName>{name}</RankName>
              <RankTime>{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
            </RankItem>
          )
        })
      )
    })
  }
  async function apiRankH () {
    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/gamer-ranking?difficulty=Hard&pageIdx=0&pageSize=3`).then(res => {
      let arr = res.data.contents
      setHard(
        arr.map((item, idx) => {
          let rank : number = item.ranking
          let name : string = item.name
          let time : number = item.time
          let milli : number = time%1000;
          time = Math.floor(time / 1000);
          let sec : number = time % 60
          time = Math.floor(time/60);
          let min : number = time
          return (
            <RankItem key={rank} rankes={rank}>
              <RankNum rankes={rank}>{rank}</RankNum>
              <RankName>{name}</RankName>
              <RankTime>{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
            </RankItem>
          )
        })
      )
    })
  }

  useEffect(() => {
    apiRankE()
    apiRankM()
    apiRankH()
  },[])

  const DivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'Easy') {
      rankdispatch({type : 'selectDiff', text : 'Easy'})
    } else if (e.currentTarget.id === 'Medium') {
      rankdispatch({type : 'selectDiff', text : 'Medium'})
    } else if (e.currentTarget.id === 'Hard') {
      rankdispatch({type : 'selectDiff', text : 'Hard'})
    }
  }

  return (
    <>
      
        <Box>
          <WordBox>명예의 전당</WordBox>
          초급
          <Link href="/board/rank">
            <RankBoxss onClick={DivClick} id={'Easy'}>
              {easy}
            </RankBoxss>
          </Link>
          중급
          <Link href="/board/rank">
            <RankBoxss onClick={DivClick} id={'Medium'}>
              {medium}
            </RankBoxss>
          </Link>
          고급
          <Link href="/board/rank">
            <RankBoxss onClick={DivClick} id={'Hard'}>
              {hard}
            </RankBoxss>
          </Link>
        </Box>
      
    </>

  )
}

const Box = styled.section`
  width : 300px;
  height : 350px;
  border : 2px solid #49add8;

  border-radius: 20px;
  padding: 10px;

  text-align: center;


  position: relative;
  top: 50px;
  left : 50%;
  transform: translateX(-50%);

  font-size: 13px;
  font-weight: 800;
`


const RankItem = styled.button<{rankes : number, ref?}>`

  border: none;
  
  width: 100%;
  height: 25px;
  background-color: #433f3f;

  display: flex;
  color : #494747;
  border-radius: 5px;

  margin-bottom: 5px;

  cursor: pointer;

  overflow: hidden;
  :hover {
    overflow: hidden;
    color : black
  }

  ${props => props.rankes === 1 && {backgroundColor : '#ffd700', fontWeight : 600}}
  ${props => props.rankes === 2 && {backgroundColor : '#c0c0c0', fontWeight : 600}}
  ${props => props.rankes === 3 && {backgroundColor : '#be6565db', fontWeight : 600}}

  pointer-events: none;
`

const RankNum = styled.div<{rankes : number}>`
  width: 25px;
  height: 25px;

  padding-top: 2px;

  font-size: 20px;
  text-align: center;

  ${props => (props.rankes === 1 ||  props.rankes === 2 ||  props.rankes === 3) && {paddingTop : '0px'}}
`
const RankName = styled.div`
  width: 100px;
  height: 25px;

  padding-top: 5px;

  font-size: 12px;
  text-align: left;

  position: relative;
  top: 0px;
  left : 20px;

`

const RankTime = styled.div`
  width: 100px;
  height: 25px;


  padding-top: 5px;

  font-size: 10px;
  font-weight: 900;
  text-align: left;

  position: relative;
  left : 40px;
`

const RankBoxss = styled.div<{value?}>`
  width: 80%;
  height: 85px;

  border: 2px solid #49add8;
  border-radius: 10px;

  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top : 0px;

  padding: 5px;

  cursor: pointer;

  font-size: 10px;
  margin-bottom: 3px;

  overflow: hidden;
`

const WordBox = styled.div`
  position: absolute;

  left: 50%;
  transform: translateX(-50%);
  top :  -25px;

  font-weight: 900;
  font-size: 13px;
`