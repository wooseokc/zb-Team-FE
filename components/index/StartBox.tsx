import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { DiffContext } from "../../src/store/diff";

export default function Start () {
  let storeWidth : number = useContext(DiffContext).diff.width
  return (
    <StartSection width={storeWidth}>
      <GameModeBox  width={storeWidth}>
        <Radio width={storeWidth} type={"radio"} name={'gamemode'} id={'single'} defaultChecked/>
        <Label width={storeWidth} htmlFor="single">싱글</Label>
        <Radio width={storeWidth} type={"radio"} name={'gamemode'} id={'multi'} disabled/>
        <Label width={storeWidth} htmlFor="multi">멀티</Label>
      </GameModeBox>
      <Link href="/game/single">
        <StartButton width={storeWidth}>시작!</StartButton>
      </Link>
    </StartSection>

  )
}

const StartSection = styled.section<{width : number}>`
  width : ${props => `${props.width/5}px`};
  height : ${props => `${props.width/15}px`};

  min-width: 324px;
  min-height: 90px;
  max-width: 514px;
  max-height: 187px;

  border : 2px solid #49add8;

  color : #464646;
  font-weight: 600;

  border-radius: 20px;
  padding: 10px;

  position : relative;
  top : ${props => `${props.width/20}px`};
  ${props => props.width >= 3000 && {top : 100}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {top :  `${props.width/40}px`}};
  ${props => props.width < 1250 && {top : 55}};
  left : 50%;
  transform: translateX(-50%);

`

const GameModeBox = styled.div <{width : number}>`
  width : ${props => `${props.width/8}px`};
  max-width: 321px;

  min-width: 150px;
  position : relative;
  left : 50%;
  transform: translateX(-50%);
  color : #464646;

  display : flex;
  justify-content: space-between;
`

const Radio = styled.input<{width : number}>`
  width : ${props => `${props.width/80}px`};
  height : ${props => `${props.width/80}px`};
  min-width: 16px;
  min-height: 16px;
  max-width: 28px;
  max-height: 28px;

  position : relative;
  left : 10px;
  top : 2px;
  ${props => props.width >= 3000 && {left : 10}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {left :  `${props.width/125}px`}};
  ${props => props.width < 1250 && {left : 10}};
  ${props => props.width >= 3000 && {top : 15}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {top :  `${props.width/625}px`}};
  ${props => props.width < 1250 && {top : 2}};
`

const Label = styled.label<{width : number}>`
  /* width : ${props => `${props.width/30}px`}; */
  min-width: 35px;
  max-width: 90px;
  font-size: ${props => props.width >= 1000 ? `${props.width/80}px` : '12px'}; ;
  ${props => props.width >= 3000 && {fontSize : 40}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize :  `${props.width/80}px`}};
  ${props => props.width < 1250 && {fontSize : 16}};

  position : relative;
  left : 5px;
  top : 2px;
`

const StartButton = styled.button<{width : number}>`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : ${props => `${props.width/8}px`};
  height : ${props => `${props.width/45}px`};

  min-width: 150px;
  min-height: 30px;
  max-width: 321px;
  max-height: 57px;
  border : 1px solid #49add8;
  border-radius: 5px;

  color : #464646;
  font-size: 15px;
  font-weight: 700;
  ${props => props.width >= 3000 && {fontSize : 35}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {fontSize :  `${props.width/100}px`}};
  ${props => props.width < 1250 && {fontSize : 12}};
  position : relative;
  left : 50%;
  transform: translateX(-50%);

  margin-top: ${props => `${props.width/50}px`};
  ${props => props.width >= 3000 && {marginTop : 50}};
  ${props => (props.width < 3000 && props.width >= 1250 )&& {marginTop : `${props.width/50}px`}};
  ${props => props.width < 1250 && {marginTop : 30}};

  :hover {
    border : 2px solid #3399c5;
    font-weight: 900;
  }
`

