import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DiffContext } from "../../../src/store/diff";
import useInterval from "../../hooks/useInterval";

export default function MyLastGame (props: { id: string}) {
  const [mineItems, setMineItems] = useState<JSX.Element[]>()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mineArr, setMineArr] = useState<any>()
  const [step, setStep] = useState<[number, number, number[]][]>([])
  const [idx, setIdx] = useState(0)
  const [time, setTime] = useState(0)
  const [inter, setInter] = useState<null | number>(null)
  const [suc, setSuc] = useState(false)

  const storeWidth : number = useContext(DiffContext).width.width
  const mineBoxSize = storeWidth/50

  useEffect(() => {
    if (props.id) {
      axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/${props.id}`).then(res => {
        setStep(JSON.parse(res.data.steps))
        let arrLength : number = 0;
        if (res.data.difficulty === 'Easy') {
          arrLength = 100;
          setWidth(10)
          setHeight(10)
        } 
        else if (res.data.difficulty === 'Medium') {
          arrLength = 256;
          setWidth(16)
          setHeight(16)
        }
        else if (res.data.difficulty === 'Hard') {
          arrLength = 480;
          setWidth(30)
          setHeight(16)
        }
        setTime(res.data.timePlayed)
        let mineArr = new Array(arrLength).fill(0).map((item, idx) => [idx, 'closed', res.data.nearbyMines[idx] === -1 ? 'mine' : 'normal', res.data.nearbyMines[idx], 0])
        
        setMineArr(mineArr);


      }).catch(() => {
        console.log('err')
      })
    }
  }, [props.id])

  useEffect(() => {
    if (mineArr !== undefined) {
      let mines = mineArr.map((item, idx)=> {
        const index : number = item[0] as number
        const status : string = item[1] as string
        const mine : string = item[2] as string
        const around : number = item[3] as number
        const flagB : boolean = item[4] as boolean
  
        return (
          <MineBox storeWidth={storeWidth} mineSize={mineBoxSize} status={status} mine={mine} key={idx} data-x={index%10}  data-y={Math.floor(index/10)} data-t={index} around={around} flag={flagB}> {(around !== 0 && status === 'open' && mine === 'normal') && around} {(flagB === true && status === 'closed') && 'F'}</MineBox>
        )
      })
      setMineItems(mines)
    }

    if (idx === step.length && idx !== 0) {
      setInter(null)
      setSuc(true)
    }

  }, [idx, mineArr])

  const play = (e: React.MouseEvent<HTMLButtonElement>) => {
    let stepLeng = step.slice().length;
    let interval = stepLeng !== 0 ? Math.floor(time/stepLeng) : null;

    setInter(interval)
  }

  const rePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSuc(false)
    setIdx(0)

    let tmpArr = mineArr.slice()
    for (let item of tmpArr) {
      item[1] = 'closed'
      item[4] = false
    }
  }
  
  function stepGo () {
    if (mineArr && step) {
      let tmpArr = mineArr.slice()
      
      let click = step[idx][0]
      let target = step[idx][1]
      let change = step[idx][2]
  
      if (click === 1) {
        tmpArr[target][1] = 'open'
        for (let item of change) {
          tmpArr[item][1] = 'open'
        }
      } else {
        if (tmpArr[target][4] === true) tmpArr[target][4] = false
        else tmpArr[target][4] = true
      }
      setIdx(i => i + 1)
    }
  }
  useInterval(stepGo, inter)

  return(
    <GameContainer>
      <StartButton storeWidth={storeWidth}  onClick={play}>재생</StartButton>
      {mineItems !== undefined && 
        <GameBox width={width} height={height} storeWidth={storeWidth} mineSize={mineBoxSize}>
          {mineItems}
        </GameBox>
      }
      <SucessBox storeWidth={storeWidth} condition={suc}> 성공 ~
        <RetryButton storeWidth={storeWidth} onClick={rePlay} >다시보기</RetryButton>
      </SucessBox>
    </GameContainer>
  )
}

const GameContainer = styled.section`
  // 드래그 방지
  -webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
  // 드래그 방지 
  width : 800px;
  height : 500px;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 100px;
`

const GameBox = styled.div<{width : number, height : number,  storeWidth : number, mineSize : number}>`
  ${props => props.width && {width : props.width * props.mineSize, height : props.height * props.mineSize}}
  min-width: ${props => `${props.width * 25}px`};
  min-height: ${props => `${props.height * 25}px`};
  max-width: ${props => `${props.width * 60}px`};
  max-height: ${props => `${props.height * 60}px`};


  border : 1px solid;
  border-radius: 10px;
  background-color: #49add8;

  padding: 5px;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 20px;
  ${props => props.storeWidth >= 3000 && {top : 150}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {top : `${props.storeWidth/20}px`}};
  ${props => props.storeWidth < 1250 && {top : 62.5}};

  display : grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows : repeat(${props => props.height}, 1fr);
`

const MineBox = styled.div<{status? : string, mine? : string, around? : number, flag? : boolean, canClick? : boolean, storeWidth : number, mineSize : number}>`
  width: 25px;
  height: 25px;

  width: ${props => `${props.mineSize}px`};
  height: ${props => `${props.mineSize}px`};

  min-width: 25px;
  min-height: 25px;
  max-width: 60px;
  max-height: 60px;

  font-size: 17px;
  ${props => props.storeWidth >= 3000 && {fontSize : 41}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/73.5}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 17}};


  box-sizing: border-box;
  border : 1px solid;

  background : #49add8;
  color : #464646;
  font-weight: bold;

  text-align: center;

  cursor : pointer;


  ${props => (props.flag === true && props.status === 'closed') && {background : 'yellow'}}
  ${props => (props.around === 0 && props.status === 'open' && props.mine === 'normal') && {background : '#CCCCFF'}}
  ${props => (props.around !== 0 && props.status === 'open' && props.mine === 'normal') && {background : '#CCCCFF', color : '#464646' }}
  ${props => (props.status === 'open' && props.mine === 'mine') && {background : '#FF0066'}}
  ${props => props.canClick === true  && {pointerEvents : 'none'}}
  
  border-color: #464646;

  :hover {
    ${props =>( props.status === 'closed' && props.flag === false) && {background : '#464646'}}
  }
`
const StartButton = styled.button<{storeWidth : number}>`
  width: 50px;
  height: 50px;

  width : ${props => `${props.storeWidth/25}px`};
  height : ${props => `${props.storeWidth/25}px`};
  min-width : 50px;
  min-height : 50px;
  max-width : 120px;
  max-height : 120px;
  border: 1px solid;

  cursor: pointer;

  background: pink;

  ${props => props.storeWidth >= 3000 && {fontSize : 34}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/84}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 15}};

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top : -40px;
`

const SucessBox = styled.div<{condition : boolean, storeWidth : number}>`
  width : ${props => `${props.storeWidth/4.16}px`};
  height : ${props => `${props.storeWidth/6.25}px`};
  min-width :300px;
  min-height : 200px;
  max-width : 721px;
  max-height : 480px;
  background : black;
  opacity : 0.8;

  ${props => props.storeWidth >= 3000 && {fontSize : 71.5}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/42}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 30}};
  color : white;

  position: absolute;
  top : 100px;
  ${props => props.storeWidth >= 3000 && {top : 240}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {top : `${props.storeWidth/12.5}px`}};
  ${props => props.storeWidth < 1250 && {top : 100}};
  left : 50%;
  transform: translateX(-50%);

  ${props => props.condition === false ? {display : 'none'} : {display : 'block'}}

  text-align: center;
  align-items: center;
`
const RetryButton = styled.button<{storeWidth : number}>`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 100px;

  height : 30px;

  width : ${props => `${props.storeWidth/12.5}px`};
  max-width : 240px;
  height : ${props => `${props.storeWidth/41.6}px`};
  min-width :100px;
  min-height : 30px;
  max-height : 72.1px;

  background : #66FFFF;

  color: #000033;
  ${props => props.storeWidth >= 3000 && {fontSize : 36}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/84}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 15}};
  font-weight: bolder;
  
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
`