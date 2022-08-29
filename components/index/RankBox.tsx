/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import styled from "styled-components";
import axios from "axios";
import { DiffContext } from "../../src/store/diff";

export default function RankBox () {

  let storeWidth : number = useContext(DiffContext).width.width
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
              <RankItem width={storeWidth} key={rank} rankes={rank}>
                <RankNum width={storeWidth} rankes={rank}>{rank}</RankNum>
                <RankName width={storeWidth} >{name}</RankName>
                <RankTime width={storeWidth} >{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
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
            <RankItem width={storeWidth} key={rank} rankes={rank}>
              <RankNum width={storeWidth}  rankes={rank}>{rank}</RankNum>
              <RankName width={storeWidth} >{name}</RankName>
              <RankTime width={storeWidth} >{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
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
            <RankItem width={storeWidth} key={rank} rankes={rank}>
              <RankNum width={storeWidth}  rankes={rank}>{rank}</RankNum>
              <RankName width={storeWidth} >{name}</RankName>
              <RankTime width={storeWidth} >{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
            </RankItem>
          )
        })
      )
    })
  }

  useEffect(() => {
    if (storeWidth === 0) storeWidth = window.innerWidth
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
      
        <Box width={storeWidth}>
          <WordBox width={storeWidth}>명예의 전당</WordBox>
          초급
          <Link href="/board/rank">
            <RankBoxss  width={storeWidth} onClick={DivClick} id={'Easy'}>
              {easy}
            </RankBoxss>
          </Link>
          중급
          <Link href="/board/rank">
            <RankBoxss  width={storeWidth} onClick={DivClick} id={'Medium'}>
              {medium}
            </RankBoxss>
          </Link>
          고급
          <Link href="/board/rank">
            <RankBoxss width={storeWidth}  onClick={DivClick} id={'Hard'}>
              {hard}
            </RankBoxss>
          </Link>
        </Box>
      
    </>

  )
}

const Box = styled.section<{width : number}>`
  width : ${props => `${props.width/3}px`};
  max-width: 820px;
  height :  ${props => `${props.width/3.3}px`};
  max-height: 800px;
  min-width: 400px;
  min-height: 400px;
  /* border : 2px solid #49add8; */

  border-radius: 20px;
  padding:  ${props => `${props.width/250}px`};

  text-align: center;

  ${props => props.width >= 3000 && {fontSize : 30}};
  ${props => (props.width < 3000 && props.width >= 1000 )&& {fontSize : `${props.width/80}px`}};
  ${props => props.width < 1000 && {fontSize : 12.5}};

  position: relative;
  top: ${props =>  `${props.width/30}px`};
  ${props => props.width >= 3000 && {top : 130}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {top :`${props.width/30}px`}};
  ${props => props.width < 1250 && {top : 60}};
  left : 50%;
  transform: translateX(-50%);

  font-weight: 800;
`


const RankItem = styled.button<{rankes : number, width : number}>`

  border: none;
  
  width: 100%;
  height: 30%;
  background-color: #433f3f;
  font-size: 40px;
  display: flex;
  color : #494747;
  border-radius: 5px;

  margin-bottom: 5px;

  min-width: 250px;
  min-height: 25px;

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

const RankNum = styled.div<{rankes : number, width : number}>`
  width: ${props => `${props.width/50}px`};
  height: 25px;
  min-width: 22px;

  ${props => props.width >= 3000 && {fontSize : 30}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize : `${props.width/80}px`}};
  ${props => props.width < 1250 && {fontSize : 16}};

  margin-top: ${props => `${props.width/260}px`};

  text-align: center;

  ${props => (props.rankes === 1 ||  props.rankes === 2 ||  props.rankes === 3) && {paddingTop : '0px'}}
`
const RankName = styled.div<{width: number}>`
  height: 25px;
  width: ${props => `${props.width/10}px`};
  min-width: 110px;
  font-size: ${props => `${props.width/100}px`};

  ${props => props.width >= 3000 && {fontSize : 30}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize : `${props.width/100}px`}};
  ${props => props.width < 1250 && {fontSize : 12.5}};
  margin-top: ${props => `${props.width/250}px`};

  text-align: left;

  position: relative;
  top: 0px;
  left : ${props => `${props.width/45}px`};
  ${props => props.width >= 3000 && {left : 60}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {left :`${props.width/30}px`}};
  ${props => props.width < 1250 && {left : 30}};

`

const RankTime = styled.div<{width: number}>`
  height: 25px;
  width: ${props => `${props.width/8}px`};


  font-size: ${props => `${props.width/100}px`};
  ${props => props.width >= 3000 && {fontSize : 30}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize : `${props.width/100}px`}};
  ${props => props.width < 1250 && {fontSize : 12.5}};
  margin-top: ${props => `${props.width/300}px`};

  font-weight: 900;
  text-align: left;

  white-space: nowrap;
  position: relative;
  left : ${props => props.width <= 2500 ? `${props.width/25}px` : '100px'};
  ${props => props.width >= 3000 && {left : 110}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {left :`${props.width/25}px`}};
  ${props => props.width < 1250 && {left : 60}};
`

const RankBoxss = styled.div<{value?, width : number}>`
  width: ${props => `${props.width/5}px`};
  max-width: 530px;
  height:  ${props => `${props.width/15}px`};
  max-height: 180px;

  min-width: 282px;
  min-height: 95px;


  border-radius: 10px;


  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top : 0px;

  padding:  ${props => `${props.width/300}px`};
  ${props => props.width >= 3000 && {padding : 12}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {padding :  `${props.width/300}px`}};
  ${props => props.width < 1250 && {padding : 5}};

  cursor: pointer;

  font-size: 10px;
  margin-bottom: 3px;

  overflow: hidden;
`

const WordBox = styled.div<{width : number}>`
  position: absolute;

  left: 50%;
  transform: translateX(-50%);
  top : ${props => props.width >= 1000 ? `-${props.width/40}px` : `-20px`};
  ${props => props.width >= 3000 && {top : -60}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {top :`-${props.width/60}px`}};
  ${props => props.width < 1250 && {top : -30}};

  font-weight: 900;
  ${props => props.width >= 3000 && {fontSize : 30}};
  ${props => (props.width < 3000 && props.width >= 1000 )&& {fontSize : `${props.width/80}px`}};
  ${props => props.width < 1000 && {fontSize : 12.5}};
`