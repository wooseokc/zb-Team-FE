import React, { useEffect, useState } from "react";
import styled from "styled-components";


export default function GameSection () {
  const [arr, setArr] = useState<(number | string | boolean) [][] >(
    Array(100).fill(0).map((item, idx) => [idx, 'closed', 'normal', 0, false])
  );
  const [fail, setFail] = useState(false);

  // 지뢰 심는 작업
  useEffect(()=> {
    let tmpArr = arr.slice()
    let mineCount = 10;
    while (mineCount > 0) {
      let a = Math.floor(Math.random()*100)
      console.log(a)
      if (tmpArr[a][2] === 'normal') {
        tmpArr[a][2] = 'mine'
        if (tmpArr[a-11]) {
          if (a % 10 !== 0) {
            (tmpArr[a-11][3] as number) += 1;
          }
        }
        if (tmpArr[a-10]) {
          (tmpArr[a-10][3] as number) += 1;
        }
        if (tmpArr[a-9]) {
          if (a%10 !== 9) {
            (tmpArr[a-9][3] as number) += 1;
          }
        }
        if (tmpArr[a-1]) {
          if (a % 10 !== 0) {
            (tmpArr[a-1][3] as number) += 1;
          }
        }
        if (tmpArr[a+1]) {
          if (a % 10 !== 9) {
            (tmpArr[a+1][3] as number) += 1;
          }
        }
        if (tmpArr[a+9]) {
          if (a % 10 !== 0) {
            (tmpArr[a+9][3] as number) += 1;
          }
        }
        if (tmpArr[a+10]) {
          (tmpArr[a+10][3] as number) += 1;
        }
        if (tmpArr[a+11]) {
          if (a % 10 !== 9) {
            (tmpArr[a+11][3] as number) += 1;
          }
        }
        mineCount --
      }
    }
    setArr(tmpArr)
    console.log(arr)
  } , [])

  const boxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target : HTMLDivElement = e.currentTarget
    const targetIndex : number = Number(target.dataset.t)

    let tmpArr = arr.slice() 
    console.log(tmpArr)
    // tmpArr[targetIndex][1] = 'open'

    // 주변 한바퀴 돌리는 함수
    function around (t : number) {
      if (tmpArr[t] === undefined) return
      if (tmpArr[t][2] === 'mine') return
      if (tmpArr[t][1] === 'open') return
      
      tmpArr[t][1] = 'open'
      
      if (tmpArr[t][3] !== 0) return
      around(t-11)
      around(t-10)
      around(t-9)
      around(t-1)
      around(t+1)
      around(t+9)
      around(t+10)
      around(t+11)
    }

    // 지뢰를 클릭했을 경우 
    if (tmpArr[targetIndex][2] === 'mine') {
      tmpArr.map((item) => {
        if (item[2] === 'mine') {
          item[1] = 'open'
        }
      })
      setFail(true)
    } else { // 아닐경우
      around(Number(target.dataset.t))
    }

    setArr(tmpArr)
  }

  const reTry = (e: React.MouseEvent<HTMLButtonElement>) => {
    let tmpArr = Array(100).fill(0).map((item, idx) => [idx, 'closed', 'normal', 0, false])
    let mineCount = 10;
    while (mineCount > 0) {
      let a = Math.floor(Math.random()*100)
      if (tmpArr[a][2] === 'normal') {
        tmpArr[a][2] = 'mine'
        if (tmpArr[a-11]) {
          if (a % 10 !== 0) {
            (tmpArr[a-11][3] as number) += 1;
          }
        }
        if (tmpArr[a-10]) {
          (tmpArr[a-10][3] as number) += 1;
        }
        if (tmpArr[a-9]) {
          if (a % 10 !== 9) {
            (tmpArr[a-9][3] as number) += 1;
          }
        }
        if (tmpArr[a-1]) {
          if (a % 10 !== 0) {
            (tmpArr[a-1][3] as number) += 1;
          }
        }
        if (tmpArr[a+1]) {
          if (a % 10 !== 9) {
            (tmpArr[a+1][3] as number) += 1;
          }
        }
        if (tmpArr[a+9]) {
          if (a % 10 !== 0) {
            (tmpArr[a+9][3] as number) += 1;
          }
        }
        if (tmpArr[a+10]) {
          (tmpArr[a+10][3] as number) += 1;
        }
        if (tmpArr[a+11]) {
          if (a % 10 !== 9) {
            (tmpArr[a+11][3] as number) += 1;
          }
        }
        mineCount --
      }
    }
    console.log(tmpArr)
    setArr(tmpArr)
    setFail(false)
  }

  const flag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    const targetIndex : number = Number(target.dataset.t);

    let tmpArr = arr.slice();
    if (tmpArr[targetIndex][4] === true)  tmpArr[targetIndex][4] = false
    else tmpArr[targetIndex][4] = true;

    setArr(tmpArr)
  }

  let mines;
  if (arr !== undefined) {
      mines = arr.map((item, idx)=> {
      const index : any = item[0]
      const status : any = item[1]
      const mine : any = item[2]
      const around : any = item[3]
      const flagB : boolean = item[4] as boolean
      return (
        <MineBox onClick={boxClick} onContextMenu={flag} status={status} mine={mine} key={idx} data-x={index%10}  data-y={Math.floor(index/10)} data-t={index} around={around} flag={flagB}> {(around !== 0 && status === 'open') && around} {(flagB === true && status === 'closed') && 'F'}</MineBox>
      )
    })
  }


  return (
    <GameContainer>
      <GameBox>
        {arr !== undefined && mines}
      </GameBox>
      <FailBox condition={fail}> 실패 ~
        <RetryButton onClick={reTry} >다시하기</RetryButton>
      </FailBox>

    </GameContainer>
  )
}

const GameContainer = styled.section`
  width : 50%;
  height : 600px;
  border : 1px solid;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 30px;
`

const GameBox = styled.div`
  width : 350px;
  height : 350px;
  border : 1px solid;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 30px;

  display : grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
`

const MineBox = styled.div<any>`
  border : 1px solid;

  background : gray;
  color : gray;

  cursor : pointer;


  ${props => (props.flag === true && props.status === 'closed') && {background : 'yellow'}}
  
  ${props => (props.around === 0 && props.status === 'open' && props.mine === 'normal') && {background : 'blue'}}
  ${props => (props.around === 1 && props.status === 'open' && props.mine === 'normal') && {background : 'blue', color : 'red' }}
  ${props => (props.around === 2 && props.status === 'open' && props.mine === 'normal') && {background : 'blue', color : 'black' }}
  ${props => (props.around === 3 && props.status === 'open' && props.mine === 'normal') && {background : 'blue', color : 'pink' }}
  ${props => (props.status === 'open' && props.mine === 'mine') && {background : 'red'}}
  border-color: gray;
`

const FailBox = styled.div<{condition : boolean}>`
  width :300px;
  height : 200px;
  background : black;
  opacity : 0.8;

  color : white;

  position: absolute;
  top : 100px;
  left : 40px;

  ${props => props.condition === false ? {display : 'none'} : {display : 'block'}}

`
const RetryButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;
  width : 100px;
  height : 30px;
  background : blue;

`