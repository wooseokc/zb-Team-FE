/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { DiffContext } from "../../src/store/diff";
import { debounce } from "lodash";

export default function RankPage () {
  const rankDiff = useContext(DiffContext).diff.diff
  const [diff, setDiff] = useState(rankDiff)
  const [page, setPage] = useState(0)
  const [morePage, setMorePage] = useState(true)
  const [rankEle, setRankEle] = useState<JSX.Element[]>()
  const router = useRouter();
  const [rankArr, setRankArr] = useState<{ gamerId : number,
    gameId : number,
    name : string,
    ranking : number,
    time : number}[]>
  ([])


  async function apiRank () {
    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/gamer-ranking?difficulty=${diff}&pageIdx=${page}&pageSize=15`).then(res => {

      if (!rankArr[0] && !res.data.contents[0]) {

      } else {
        if (!rankArr[0]) {
          setRankArr([...res.data.contents])

        } else if (!res.data.contents[0]) {
          setMorePage(false)
        } else {
          if (rankArr[0].ranking === res.data.contents[0].ranking) {
            setRankArr([...res.data.contents])
          } else {
            setRankArr([...rankArr, ...res.data.contents])
          }
        }

        if (res.data.contents.length < 15) {
          setMorePage(false)
        }
      }

    })
  }

  useEffect(() => {
    apiRank()

  }, [diff])

  useEffect(() => {
    apiRank()

  }, [page])


  useEffect(() => {
    if (rankArr) {
      setRankEle(
        rankArr.map((item, idx) => {
        let rank : number = item.ranking
        let name : string = item.name
        let time : number = item.time
        let milli : number = time%1000;
        time = Math.floor(time / 1000);
        let sec : number = time % 60
        time = Math.floor(time/60);
        let min : number = time
        return (
          <RankItem key={rank} rankes={rank} value={item.gameId} onClick={LinkToGame} >
            <RankNum rankes={rank}>{rank}</RankNum>
            <RankName>{name}</RankName>
            <RankTime>{min > 0 && `${min} 분`} {sec}.{milli} 초</RankTime>
          </RankItem>
        )
      }))

    }
  }, [rankArr])

  const boxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (target.id === 'Medium') {
      setDiff('Medium')
    } else if (target.id === 'Easy') {
      setDiff('Easy')
    } else if (target.id === 'Hard') {
      setDiff('Hard')
    }
    setPage(0)
    setMorePage(true)
  }

  const scrollCheck = debounce((e: any) => {
    const target = e.target.scrollHeight - e.target.clientHeight
    const scroll = e.target.scrollTop

    

    if (target - scroll <=30 && morePage) {
      setPage(p => p + 1)
    }
  },300)

  const LinkToGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/info/mylastgame/${e.currentTarget.value}`)
  }

  return (
    <RankSection>
      <DiffSelec>
      <div>
        <GameRadio onClick={boxClick} type={'radio'} id='Easy' name="game" defaultChecked={rankDiff === 'Easy' || !rankDiff ? true : false}></GameRadio>
        <RadioLable htmlFor="Easy" >초급</RadioLable>     
      </div>
      <div>
        <GameRadio onClick={boxClick} type={'radio'} id='Medium' name="game" defaultChecked={rankDiff === 'Medium' ? true : false}></GameRadio>
        <RadioLable htmlFor="Medium">중급</RadioLable>
      </div>
      <div>
        <GameRadio onClick={boxClick} type={'radio'} id='Hard' name="game" defaultChecked={rankDiff === 'Hard'  ? true : false}></GameRadio>
        <RadioLable htmlFor="Hard">고급</RadioLable>
      </div>
      </DiffSelec>
      <RankBox onScroll={scrollCheck}>
        {rankEle}
      </RankBox>
    </RankSection>
  )
}

const RankSection = styled.section`
  width: 520px;
  height: 600px;


  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top : 30px;
`

const DiffSelec = styled.div`
  width: 80%;
  height: 30px;

  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top : 30px;

  display: flex;
  justify-content: space-around;
`

const GameRadio = styled.input` 
  position: relative;
  top: 30%;
  transform: translateY(-50%);
`

const RadioLable = styled.label`
  position: relative;
  top : 2px;

`

const RankBox = styled.div`
  width: 60%;
  height: 450px;

  border: 5px solid #49add8;
  border-radius: 10px;

  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top : 50px;

  padding: 10px;


  overflow-y: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  font-size: 20px;

  ::-webkit-scrollbar {
    width: 15px;
    background-color : #49add8;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color : #155874;
  }

`

const RankItem = styled.button<{rankes : number, ref?}>`

  border: none;
  
  width: 100%;
  height: 30px;
  background-color: #d7afaf;

  display: flex;
  color : #494747;
  border-radius: 5px;

  margin-bottom: 5px;

  cursor: pointer;


  :hover {
    color : black
  }

  ${props => props.rankes === 1 && {backgroundColor : '#ffd700', fontWeight : 900}}
  ${props => props.rankes === 2 && {backgroundColor : '#c0c0c0', fontWeight : 900}}
  ${props => props.rankes === 3 && {backgroundColor : '#be6565db', fontWeight : 900}}
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

  font-size: 14px;
  text-align: left;

  position: relative;
  top: 0px;
  left : 20px;

`

const RankTime = styled.div`
  width: 100px;
  height: 25px;


  padding-top: 5px;

  font-size: 14px;
  text-align: left;

  position: relative;
  left : 40px;
`

const MoreItem = styled.button`
  width: 30px;
  height: 30px;
  
  border-radius: 100%;

  font-size: 15px;
  font-weight: 900;

  border: 0px;

  padding: 0;

  background-color: #49add8;
  color: #FFF;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

  cursor: pointer;
`

