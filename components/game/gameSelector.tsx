import React from "react";
import styled from "styled-components";

interface selector {
  width : any,
  height : any,
  mine : any
}

export default function GameSelector (props: selector) {
  const boxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (target.id === 'medium') {
      props.width(16)
      props.height(16)
      props.mine(40)
    } else if (target.id === 'easy') {
      props.width(10)
      props.height(10)
      props.mine(10)
    } else if (target.id === 'hard') {
      props.width(30)
      props.height(16)
      props.mine(99)
    }
  }


  return (
    <SelectorBox>
      <div>
        <GameRadio onClick={boxClick} type={'radio'} id='easy' name="game" defaultChecked></GameRadio>
        <RadioLable htmlFor="easy" >초급</RadioLable>     
      </div>
      <div>
        <GameRadio onClick={boxClick} type={'radio'} id='medium' name="game"></GameRadio>
        <RadioLable htmlFor="medium">중급</RadioLable>
      </div>
      <div>
        <GameRadio onClick={boxClick} type={'radio'} id='hard' name="game"></GameRadio>
        <RadioLable htmlFor="hard">고급</RadioLable>
      </div>
      <div>
        <GameRadio type={'radio'} id='custom' name="game"></GameRadio>
        <RadioLable htmlFor="custom">커스텀</RadioLable>
      </div>
    </SelectorBox>
  )
}

const SelectorBox = styled.section`
  width: 400px;
  height: 30px;
  border: 1px solid;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top : 100px;
  
  display: flex;
  justify-content: space-between;
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