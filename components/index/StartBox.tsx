import React from "react";
import styled from "styled-components";

export default function Start () {

  return (
    <StartSection>
      <GameModeBox>
        <Radio type={"radio"} name={'gamemode'} id={'single'}/>
        <Label htmlFor="single">싱글</Label>
        <Radio type={"radio"} name={'gamemode'} id={'multi'}/>
        <Label htmlFor="multi">멀티</Label>
      </GameModeBox>
      <StartButton>시작!</StartButton>
    </StartSection>

  )
}

const StartSection = styled.section`
  width : 250px;
  height : 100px;
  border : 1px solid;

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
  border : 1px solid;
  border-radius: 5px;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
`
