/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DiffContext } from "../../src/store/diff";
import useInterval from "../hooks/useInterval";
import MyGameBox from "./mygame";
import YourGameBox from "./yourgame";

export default function MultiSection () {
  const storeWidth : number = useContext(DiffContext).width.width;
  const [gameStatus, setGameStatus] = useState<number | null>(null)
  const [startTime, setStartTime] = useState({
    milli : 0,
    sec : 0,
    min : 0,
    hour : 0,
  })
  const [timer, setTimer] = useState({
    milli : 0,
    sec : 0,
    min : 0,
  })

  function timerSet () {
    const nowTime = new Date();

    let nowHour = nowTime.getHours()
    let nowMilli = nowTime.getMilliseconds()
    let nowSecond = nowTime.getSeconds()
    let nowMin = nowTime.getMinutes()

    let startMilli = startTime.milli
    let startSecond = startTime.sec
    let startMin = startTime.min
    let startHour = startTime.hour


    while (nowHour !== startHour) {
      if (nowHour < startHour) {
        nowHour += 24;
      }

      nowMin += 60;
      nowHour --;
    }

    if (nowMilli < startMilli) {
      nowSecond --;
      nowMilli += 1000;
    }

    if (nowSecond < startSecond && nowMin > startMin) {
      nowMin --;
      nowSecond += 60;

      if (nowSecond - startSecond >= 60 ){
        nowSecond -= 60;
        nowMin ++;
      }
    }
    setTimer({milli : nowMilli - startMilli, sec : nowSecond - startSecond, min : nowMin - startMin})
    let dur = (nowMilli - startMilli) + (nowSecond-startSecond)*1000 + (nowMin - startMin) * 1000 * 60;
  };

  useInterval(timerSet, gameStatus)

  useEffect(() => {
    const startDate = new Date();
    setStartTime({milli : startDate.getMilliseconds(), sec : startDate.getSeconds(), min : startDate.getMinutes(), hour : startDate.getHours()})

    setGameStatus(37)
  }, [])

  return (
    <MultiBox>
      <MyGameBox/>
      <Timer storeWidth={storeWidth}>time : {`${timer.min}:${timer.sec}:${Math.floor(timer.milli / 10)}`}</Timer>
      <YourGameBox/>
    </MultiBox>
  )
}

const MultiBox = styled.section`
  display: flex;
  justify-content: space-around;
`

const Timer = styled.div<{storeWidth : number}>`
  white-space: nowrap;
  position: absolute;

  top : 150px;

  ${props => props.storeWidth >= 3000 && {fontSize : 38}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/78}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 16}};


  ${props => props.storeWidth >= 3000 && {top : 150}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {top : `${props.storeWidth/20}px`}};
  ${props => props.storeWidth < 1250 && {top : 62.6}};

`