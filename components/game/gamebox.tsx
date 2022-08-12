import React, { useState } from "react";
import styled from "styled-components";


export default function GameSection () {
  const [mineArr, setMineArr] = useState([]);

  const arr : number[] = [];
  for (let i=0; i<100 ; i++) {
    arr.push(i)
  }
  
  let numArr : number[] = [];
  for (let i=0; i<100 ; i++) {
    numArr.push(i)
  }

  let mineCount = 10;

  while (mineCount > 0) {
    
    let a = Math.floor(Math.random()*100)
    if (numArr[a] !== -1) {
      numArr[a] = -1;
      mineCount--
    } else continue
  }

  const twoArr : number[][] = [];
  let tmp : number[] = [];
  for (let i=0; i<numArr.length ; i++) {
    tmp.push(numArr[i])
    if (tmp.length === 20) {
      twoArr.push(tmp.slice());
      tmp = []
    }
  }

  console.log(twoArr)

  const boxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target : any = e.target
    console.log(target.classList)
  }


  const mines = arr.map((item, idx)=> {
    return (
      <MineBox onClick={boxClick} key={idx} className={[`x:${item%20}`, `y:${Math.floor(item/20)}`, `t:${item}`, 'closed']} value={'ersd'}> </MineBox>
    )
  })


  return (
    <GameContainer>
      <GameBox>
        {mines}
        
      </GameBox>

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

const MineBox = styled.div<{ className :any, value : string}>`
  border : 1px solid;

  background : gray;

  cursor : pointer;

  ${props => props.className[3] === 'open' && {background : 'blue'}}
`
