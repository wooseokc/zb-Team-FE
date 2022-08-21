import React from "react";
import Link from "next/link";
import styled from "styled-components";

export default function Start () {

  return (
    <StartSection>
      <GameModeBox>
        <Radio type={"radio"} name={'gamemode'} id={'single'} defaultChecked/>
        <Label htmlFor="single">싱글</Label>
        <Radio type={"radio"} name={'gamemode'} id={'multi'} disabled/>
        <Label htmlFor="multi">멀티</Label>
      </GameModeBox>
      <Link href="/game/single">
        <StartButton>시작!</StartButton>
      </Link>
    </StartSection>

  )
}

const StartSection = styled.section`
  width : 250px;
  height : 100px;
  border : 2px solid #49add8;

  color : #464646;
  font-weight: 600;

  border-radius: 20px;
  padding: 10px;

  position : relative;
  top : 70px;
  left : 50%;
  transform: translateX(-50%);
`

const GameModeBox = styled.div`
width : 150px;
height : 40px;
position : relative;
left : 50%;
transform: translateX(-50%);
color : #464646;

display : flex;
justify-content: space-between;
`

const Radio = styled.input`
  width : 15px;
  height : 15px;

  position : relative;
  left : 10px;
  top : 2px;
`

const Label = styled.label`
  width : 50px;

  position : relative;
  left : 10px;
  top : 2px;
`

const StartButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 200px;
  height : 40px;
  border : 1px solid #49add8;
  border-radius: 5px;

  color : #464646;
  font-size: 15px;
  font-weight: 700;

  position : relative;
  left : 50%;
  transform: translateX(-50%);

  :hover {
    border : 2px solid #3399c5;
    font-weight: 900;
  }
`

