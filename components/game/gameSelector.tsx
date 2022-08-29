import React, { useContext } from "react";
import styled from "styled-components";
import { DiffContext } from "../../src/store/diff";

interface selector {
  width : any,
  height : any,
  mine : any
}

export default function GameSelector (props: selector) {
  const storeWidth : number = useContext(DiffContext).width.width

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
    <SelectorBox  width={storeWidth}>
      <div>
        <GameRadio  width={storeWidth} onClick={boxClick} type={'radio'} id='easy' name="game" defaultChecked></GameRadio>
        <RadioLable  width={storeWidth} htmlFor="easy" >초급</RadioLable>     
      </div>
      <div>
        <GameRadio width={storeWidth} onClick={boxClick} type={'radio'} id='medium' name="game"></GameRadio>
        <RadioLable  width={storeWidth} htmlFor="medium">중급</RadioLable>
      </div>
      <div>
        <GameRadio width={storeWidth} onClick={boxClick} type={'radio'} id='hard' name="game"></GameRadio>
        <RadioLable  width={storeWidth} htmlFor="hard">고급</RadioLable>
      </div>
      {/* <div>
        <GameRadio type={'radio'} id='custom' name="game"></GameRadio>
        <RadioLable htmlFor="custom">커스텀</RadioLable>
      </div> */}
    </SelectorBox>
  )
}

const SelectorBox = styled.section<{width : number}>`
  width: ${props => `${props.width/4.16}px`};
  height:  ${props => `${props.width/41.6}px`};
  min-width: 300px;
  min-height: 30px;
  max-width: 720px;
  max-height: 72px;
  border: 3px solid #49add8;
  border-radius: 10px;
  
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 3px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${props => props.width >= 3000 && {top : 150}};
  ${props => (props.width < 3000 && props.width >= 2500 )&& {top : 140}};
  ${props => (props.width < 2500 && props.width >= 2000 )&& {top : 130}};
  ${props => (props.width < 2000 && props.width >= 1600 )&& {top : 120}};
  ${props => (props.width < 1600 && props.width >= 1250 )&& {top : 110}};
  ${props => props.width < 1250 && {top : 100}};
  
  display: flex;
  justify-content: space-between;
`

const GameRadio = styled.input<{width : number}>` 

  width: ${props => `${props.width/97}px`};
  height:  ${props => `${props.width/97}px`};
  min-width: 13px;
  min-height: 13px;
  max-width: 31px;
  max-height: 31px;
  position: relative;
  top: 30%;
  transform: translateY(-50%);
`

const RadioLable = styled.label<{width : number}>`
  position: relative;
  ${props => props.width >= 3000 && {fontSize : 36}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize : `${props.width/84}px`}};
  ${props => props.width < 1250 && {fontSize : 15}};
  top : 10%;

`