/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DiffContext } from "../../src/store/diff";
import useInterval from "../hooks/useInterval";

interface props {
  width : number,
  height : number,
  mine : number
}

export default function GameSectionMobile (props : props) {
  const [notice, setNotice] = useState(true)
  const [touchTime, setTouchTime] = useState(0)
  const width = props.width;
  const height = props.height;
  const howManyMines = props.mine;
  const total = width * height;
  const [arr, setArr] = useState<(number | string | boolean)[][] >(
    Array(total).fill(0).map((item, idx) => [idx, 'closed', 'normal', 0, false])
  );
  const [fail, setFail] = useState(false);
  const [suc, setSuc] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [gameStatus, setGameStatus] = useState<number | null>(null)
  const [steps, setSteps] = useState<(number | number [])[][] >([])
  const [howManyOpen, setHowManyOpen] = useState(0)
  
  const [startTime, setStartTime] = useState({
    milli : 0,
    sec : 0,
    min : 0,
  })
  const [timer, setTimer] = useState({
    milli : 0,
    sec : 0,
    min : 0,
  })
  const [postObj, setPostObj] = useState<{
    gamerId : number,
    width? : number,
    height? : number,
    numMines? : number

    isMine? : string[],
    nearbyMines? : number[],

    timePlayed? : number,
    isAnon? : boolean,
    
    steps? : string
  }>({gamerId : 0})

  const storeWidth : number = useContext(DiffContext).width.width
  const mineBoxSize = storeWidth/50

  // 지뢰 심는 작업
  useEffect(()=> {

    let tmpArr = Array(total).fill(0).map((item, idx) => [idx, 'closed', 'normal', 0, false]);
    // [0] = 데이터 번호, [1] = 박스 상태 (열렸는지 아직 닫혀있는지) [2] = 지뢰인지 아닌지 
    //[3] = 주변에 지뢰 몇개인지 [4] = 깃발이 있는지 없는지

    let mineCount = howManyMines; // 지뢰 개수
    setGameStatus(null)
    while (mineCount > 0) {
      let a = Math.floor(Math.random()*total)  

      if (tmpArr[a][2] === 'normal') {
        tmpArr[a][2] = 'mine'
        if (tmpArr[a-width-1]) {
          if (a % width !== 0) {
            (tmpArr[a-width-1][3] as number) += 1;
          }
        }
        if (tmpArr[a-width]) {
          (tmpArr[a-width][3] as number) += 1;
        }
        if (tmpArr[a-width+1]) {
          if (a % width !== width-1) {
            (tmpArr[a-width+1][3] as number) += 1;
          }
        }
        if (tmpArr[a-1]) {
          if (a % width !== 0) {
            (tmpArr[a-1][3] as number) += 1;
          }
        }
        if (tmpArr[a+1]) {
          if (a % width !== width-1) {
            (tmpArr[a+1][3] as number) += 1;
          }
        }
        if (tmpArr[a+width-1]) {
          if (a % width !== 0) {
            (tmpArr[a+width-1][3] as number) += 1;
          }
        }
        if (tmpArr[a+width]) {
          (tmpArr[a+width][3] as number) += 1;
        }
        if (tmpArr[a+width+1]) {
          if (a % width !== width-1) {
            (tmpArr[a+width+1][3] as number) += 1;
          }
        }
        mineCount --
      }
    }
    setArr(tmpArr)
    

    let openArr : string[] = []
    let mineArr : string[] = []
    let aroundArr : number[] = []
    let flagArr : boolean[] = [];
    for (let i=0 ; i<tmpArr.length ; i++) {
      openArr.push(tmpArr[i][1] as string)
      mineArr.push(tmpArr[i][2] as string)
      aroundArr.push(tmpArr[i][3] as number)
      flagArr.push(tmpArr[i][4] as boolean)
    }

    setPostObj({gamerId: Number(sessionStorage.getItem('gamerId')), width : width, height : height, numMines : howManyMines,  isMine : mineArr, nearbyMines : aroundArr, isAnon : true, timePlayed : 0, steps: ''})
    setFlagCount(0)

  } , [total])

  const boxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    
    if (gameStatus === null) {
      const startDate = new Date();
      setStartTime({milli : startDate.getMilliseconds(), sec : startDate.getSeconds(), min : startDate.getMinutes()})
      setGameStatus(37)
    } 
    if (postObj.isMine === undefined) {
      let tmpArr= arr.slice()
      let openArr : string[] = []
      let mineArr : string[] = []
      let aroundArr : number[] = []
      let flagArr : boolean[] = [];
      for (let i=0 ; i<tmpArr.length ; i++) {
        openArr.push(tmpArr[i][1] as string)
        mineArr.push(tmpArr[i][2] as string)
        aroundArr.push(tmpArr[i][3] as number)
        flagArr.push(tmpArr[i][4] as boolean)
      }
  
      setPostObj({gamerId : Number(sessionStorage.getItem('gamerId')), width : width, height : height, numMines : howManyMines, isMine : mineArr, nearbyMines : aroundArr, isAnon : true, timePlayed : 0})
      
    }
    const target : HTMLDivElement = e.currentTarget
    const targetIndex : number = Number(target.dataset.t)

    let tmpArr = arr.slice() 
    let tmpStep = [1, targetIndex ,[]];
    let tmpStepArr =  tmpStep[2] as number[]

    // 주변 한바퀴 돌리는 함수
    function around (t : number) {
      if (tmpArr[t] === undefined) return
      if (tmpArr[t][2] === 'mine') return
      if (tmpArr[t][1] === 'open') return
      if (tmpArr[t][4] === true) return
      tmpArr[t][1] = 'open';
      tmpArr[t][4] = false;
      tmpStepArr.push(t)

      if (tmpArr[t][3] !== 0) return

      if (t % width === 0) {
        around(t-width)
        around(t-width+1)
        around(t+1)
        around(t+width)
        around(t+width+1)
      } else if (t % width === width -1 ) {
        around(t-width-1)
        around(t-width)
        around(t-1)
        around(t+width-1)
        around(t+width)
      } else {
        around(t-width-1)
        around(t-width)
        around(t-width+1)
        around(t-1)
        around(t+1)
        around(t+width-1)
        around(t+width)
        around(t+width+1)
      }
    }
    function aroundMine (t : number) {
      if (tmpArr[t] === undefined) return
      if (tmpArr[t][1] === 'open') return
      if (tmpArr[t][4] === true) return
      
      if (tmpArr[t][2] === 'mine') {
        tmpArr.map((item) => {
          if (item[2] === 'mine') {
            item[1] = 'open'
          }
          return item
        })
        setFail(true)
        setGameStatus(null)
        return
      }
      tmpArr[t][1] = 'open';
      tmpStepArr.push(t)
      tmpArr[t][4] = false;
      if (tmpArr[t][3] !== 0) return

      if (t % width === 0) {
        aroundMine(t-width)
        aroundMine(t-width+1)
        aroundMine(t+1)
        aroundMine(t+width)
        aroundMine(t+width+1)
      } else if (t % width === width -1 ) {
        aroundMine(t-width-1)
        aroundMine(t-width)
        aroundMine(t-1)
        aroundMine(t+width-1)
        aroundMine(t+width)
      } else {
        aroundMine(t-width-1)
        aroundMine(t-width)
        aroundMine(t-width+1)
        aroundMine(t-1)
        aroundMine(t+1)
        aroundMine(t+width-1)
        aroundMine(t+width)
        aroundMine(t+width+1)
      }
    }

    // 지뢰를 클릭했을 경우 
    if (tmpArr[targetIndex][2] === 'mine' && tmpArr[targetIndex][4] === false) {
      tmpArr.map((item) => {
        if (item[2] === 'mine') {
          item[1] = 'open'
        }
        return item
      })
      setFail(true)
      setGameStatus(null)

    } else { // 아닐경우
      if (tmpArr[targetIndex][1] === 'closed') {
        around(Number(target.dataset.t))
      } else {
        let flagCount : number = 0;
        if (tmpArr[targetIndex-width-1] && tmpArr[targetIndex-width-1][4] === true) {
          if (targetIndex % width !== 0) {
            flagCount ++;
          }
        }
        if (tmpArr[targetIndex-width] && tmpArr[targetIndex-width][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex-width+1] && tmpArr[targetIndex-width+1][4] === true) {
          if (targetIndex % width !== width - 1) {
            flagCount ++;
          }
        }
        if (tmpArr[targetIndex-1] && tmpArr[targetIndex-1][4] === true) {
          if (targetIndex % width !== 0) {
            flagCount ++;
          }
        }
        if (tmpArr[targetIndex+1] && tmpArr[targetIndex+1][4] === true) {
          if (targetIndex % width !== width - 1) {
            flagCount ++;
          }
        }
        if (tmpArr[targetIndex+width-1] && tmpArr[targetIndex+width-1][4] === true) {
          if (targetIndex % width !== 0) {
            flagCount ++;
          }
        }
        if (tmpArr[targetIndex+width] && tmpArr[targetIndex+width][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex+width+1] && tmpArr[targetIndex+width+1][4] === true) {
          if (targetIndex % width !== width - 1) {
            flagCount ++;
          }
        }
        if (tmpArr[targetIndex][3] === flagCount && tmpArr[targetIndex][3] !== 0) {
          if (Number(target.dataset.t) % width === 0) {
            aroundMine(Number(target.dataset.t)-width)
            aroundMine(Number(target.dataset.t)-width+1)
            aroundMine(Number(target.dataset.t)+1)
            aroundMine(Number(target.dataset.t)+width)
            aroundMine(Number(target.dataset.t)+width+1)
          } else if (Number(target.dataset.t) % width === width -1) {
            aroundMine(Number(target.dataset.t)-width-1)
            aroundMine(Number(target.dataset.t)-width)
            aroundMine(Number(target.dataset.t)-1)
            aroundMine(Number(target.dataset.t)+width-1)
            aroundMine(Number(target.dataset.t)+width)
          } else {
            aroundMine(Number(target.dataset.t)-width-1)
            aroundMine(Number(target.dataset.t)-width)
            aroundMine(Number(target.dataset.t)-width+1)
            aroundMine(Number(target.dataset.t)-1)
            aroundMine(Number(target.dataset.t)+1)
            aroundMine(Number(target.dataset.t)+width-1)
            aroundMine(Number(target.dataset.t)+width)
            aroundMine(Number(target.dataset.t)+width+1)
          }

        }
      }
    }

    let openedCount = tmpArr.filter(item => item[1] === 'open').length
    setHowManyOpen(openedCount)
    if (openedCount === total - howManyMines && flagCount === howManyMines) {
      setSuc(true)
      setGameStatus(null);
    }
    setArr(tmpArr)
    if (tmpStepArr.length !== 0) {
      setSteps([...steps, tmpStep])
    }
    // setSteps(newStep)
  }

  const reTry = (e: React.MouseEvent<HTMLButtonElement>) => {
    let tmpArr = Array(total).fill(0).map((item, idx) => [idx, 'closed', 'normal', 0, false]);
    setTimer({milli : 0, sec : 0, min : 0})
    setGameStatus(null)
    let mineCount = howManyMines; // 지뢰 개수

    while (mineCount > 0) {
      let a = Math.floor(Math.random()*total)  

      if (tmpArr[a][2] === 'normal') {
        tmpArr[a][2] = 'mine'
        if (tmpArr[a-width-1]) {
          if (a % width !== 0) {
            (tmpArr[a-width-1][3] as number) += 1;
          }
        }
        if (tmpArr[a-width]) {
          (tmpArr[a-width][3] as number) += 1;
        }
        if (tmpArr[a-width+1]) {
          if (a % width !== width-1) {
            (tmpArr[a-width+1][3] as number) += 1;
          }
        }
        if (tmpArr[a-1]) {
          if (a % width !== 0) {
            (tmpArr[a-1][3] as number) += 1;
          }
        }
        if (tmpArr[a+1]) {
          if (a % width !== width-1) {
            (tmpArr[a+1][3] as number) += 1;
          }
        }
        if (tmpArr[a+width-1]) {
          if (a % width !== 0) {
            (tmpArr[a+width-1][3] as number) += 1;
          }
        }
        if (tmpArr[a+width]) {
          (tmpArr[a+width][3] as number) += 1;
        }
        if (tmpArr[a+width+1]) {
          if (a % width !== width-1) {
            (tmpArr[a+width+1][3] as number) += 1;
          }
        }
        mineCount --
      }
    }

    async function resultPost () {
      await axios.post('https://minesweeper.hanjoon.dev/minesweeper/game', postObj).then(res => {
        let gamerResId : number = res.data.gamerId;
        if (postObj.gamerId !== gamerResId) {
          sessionStorage.setItem('gamerId', String(gamerResId))
          setPostObj({...postObj, gamerId : gamerResId})
        }
      })
    }

    if (suc) {
      resultPost()
    }

    let openArr : string[] = []
    let mineArr : string[] = []
    let aroundArr : number[] = []
    let flagArr : boolean[] = [];
    for (let i=0 ; i<tmpArr.length ; i++) {
      openArr.push(tmpArr[i][1] as string)
      mineArr.push(tmpArr[i][2] as string)
      aroundArr.push(tmpArr[i][3] as number)
      flagArr.push(tmpArr[i][4] as boolean)
    }
    setPostObj({gamerId : 0})
    setArr(tmpArr)
    setFail(false)
    setSuc(false)
    setFlagCount(0)
    setGameStatus(null)
    setSteps([])
    
  }


  const onMouseDown = (e: React.UIEvent<HTMLDivElement>) => {
    const date = new Date()
    setTouchTime(date.getTime())
  }
  const onMouseUp = (e: React.UIEvent<HTMLDivElement>) => {
    const date = new Date()
    if (date.getTime() - touchTime >= 500) {

      const target = e.currentTarget
      const targetIndex : number = Number(target.dataset.t);
      let flagC = flagCount;

      let tmpStep = [2, targetIndex, [targetIndex]];

      let tmpArr = arr.slice();
      if (tmpArr[targetIndex][1] === 'closed') {
        setSteps([...steps, tmpStep])
        if (tmpArr[targetIndex][4] === true) {
          tmpArr[targetIndex][4] = false
          setFlagCount(c => c - 1);
          flagC --;
        }
        else {
          tmpArr[targetIndex][4] = true;
          setFlagCount(c => c + 1);
          flagC ++;
        }
      }

      if (howManyOpen === total - howManyMines && flagC === howManyMines) {
        setSuc(true)
        setGameStatus(null);
      }

      setArr(tmpArr)


     }
    else {
    
        if (gameStatus === null) {
          const startDate = new Date();
          setStartTime({milli : startDate.getMilliseconds(), sec : startDate.getSeconds(), min : startDate.getMinutes()})
          setGameStatus(37)
        } 
        if (postObj.isMine === undefined) {
          let tmpArr= arr.slice()
          let openArr : string[] = []
          let mineArr : string[] = []
          let aroundArr : number[] = []
          let flagArr : boolean[] = [];
          for (let i=0 ; i<tmpArr.length ; i++) {
            openArr.push(tmpArr[i][1] as string)
            mineArr.push(tmpArr[i][2] as string)
            aroundArr.push(tmpArr[i][3] as number)
            flagArr.push(tmpArr[i][4] as boolean)
          }
      
          setPostObj({gamerId : Number(sessionStorage.getItem('gamerId')), width : width, height : height, numMines : howManyMines, isMine : mineArr, nearbyMines : aroundArr, isAnon : true, timePlayed : 0})
          
        }
        const target : HTMLDivElement = e.currentTarget
        const targetIndex : number = Number(target.dataset.t)
    
        let tmpArr = arr.slice() 
        let tmpStep = [1, targetIndex ,[]];
        let tmpStepArr =  tmpStep[2] as number[]
    
        // 주변 한바퀴 돌리는 함수
        function around (t : number) {
          if (tmpArr[t] === undefined) return
          if (tmpArr[t][2] === 'mine') return
          if (tmpArr[t][1] === 'open') return
          if (tmpArr[t][4] === true) return
          tmpArr[t][1] = 'open';
          tmpArr[t][4] = false;
          tmpStepArr.push(t)
    
          if (tmpArr[t][3] !== 0) return
    
          if (t % width === 0) {
            around(t-width)
            around(t-width+1)
            around(t+1)
            around(t+width)
            around(t+width+1)
          } else if (t % width === width -1 ) {
            around(t-width-1)
            around(t-width)
            around(t-1)
            around(t+width-1)
            around(t+width)
          } else {
            around(t-width-1)
            around(t-width)
            around(t-width+1)
            around(t-1)
            around(t+1)
            around(t+width-1)
            around(t+width)
            around(t+width+1)
          }
        }
        function aroundMine (t : number) {
          if (tmpArr[t] === undefined) return
          if (tmpArr[t][1] === 'open') return
          if (tmpArr[t][4] === true) return
          
          if (tmpArr[t][2] === 'mine') {
            tmpArr.map((item) => {
              if (item[2] === 'mine') {
                item[1] = 'open'
              }
              return item
            })
            setFail(true)
            setGameStatus(null)
            return
          }
          tmpArr[t][1] = 'open';
          tmpStepArr.push(t)
          tmpArr[t][4] = false;
          if (tmpArr[t][3] !== 0) return
    
          if (t % width === 0) {
            aroundMine(t-width)
            aroundMine(t-width+1)
            aroundMine(t+1)
            aroundMine(t+width)
            aroundMine(t+width+1)
          } else if (t % width === width -1 ) {
            aroundMine(t-width-1)
            aroundMine(t-width)
            aroundMine(t-1)
            aroundMine(t+width-1)
            aroundMine(t+width)
          } else {
            aroundMine(t-width-1)
            aroundMine(t-width)
            aroundMine(t-width+1)
            aroundMine(t-1)
            aroundMine(t+1)
            aroundMine(t+width-1)
            aroundMine(t+width)
            aroundMine(t+width+1)
          }
        }
    
        // 지뢰를 클릭했을 경우 
        if (tmpArr[targetIndex][2] === 'mine' && tmpArr[targetIndex][4] === false) {
          tmpArr.map((item) => {
            if (item[2] === 'mine') {
              item[1] = 'open'
            }
            return item
          })
          setFail(true)
          setGameStatus(null)
    
        } else { // 아닐경우
          if (tmpArr[targetIndex][1] === 'closed') {
            around(Number(target.dataset.t))
          } else {
            let flagCount : number = 0;
            if (tmpArr[targetIndex-width-1] && tmpArr[targetIndex-width-1][4] === true) {
              if (targetIndex % width !== 0) {
                flagCount ++;
              }
            }
            if (tmpArr[targetIndex-width] && tmpArr[targetIndex-width][4] === true) {
              flagCount ++;
            }
            if (tmpArr[targetIndex-width+1] && tmpArr[targetIndex-width+1][4] === true) {
              if (targetIndex % width !== width - 1) {
                flagCount ++;
              }
            }
            if (tmpArr[targetIndex-1] && tmpArr[targetIndex-1][4] === true) {
              if (targetIndex % width !== 0) {
                flagCount ++;
              }
            }
            if (tmpArr[targetIndex+1] && tmpArr[targetIndex+1][4] === true) {
              if (targetIndex % width !== width - 1) {
                flagCount ++;
              }
            }
            if (tmpArr[targetIndex+width-1] && tmpArr[targetIndex+width-1][4] === true) {
              if (targetIndex % width !== 0) {
                flagCount ++;
              }
            }
            if (tmpArr[targetIndex+width] && tmpArr[targetIndex+width][4] === true) {
              flagCount ++;
            }
            if (tmpArr[targetIndex+width+1] && tmpArr[targetIndex+width+1][4] === true) {
              if (targetIndex % width !== width - 1) {
                flagCount ++;
              }
            }
            if (tmpArr[targetIndex][3] === flagCount && tmpArr[targetIndex][3] !== 0) {
              if (Number(target.dataset.t) % width === 0) {
                aroundMine(Number(target.dataset.t)-width)
                aroundMine(Number(target.dataset.t)-width+1)
                aroundMine(Number(target.dataset.t)+1)
                aroundMine(Number(target.dataset.t)+width)
                aroundMine(Number(target.dataset.t)+width+1)
              } else if (Number(target.dataset.t) % width === width -1) {
                aroundMine(Number(target.dataset.t)-width-1)
                aroundMine(Number(target.dataset.t)-width)
                aroundMine(Number(target.dataset.t)-1)
                aroundMine(Number(target.dataset.t)+width-1)
                aroundMine(Number(target.dataset.t)+width)
              } else {
                aroundMine(Number(target.dataset.t)-width-1)
                aroundMine(Number(target.dataset.t)-width)
                aroundMine(Number(target.dataset.t)-width+1)
                aroundMine(Number(target.dataset.t)-1)
                aroundMine(Number(target.dataset.t)+1)
                aroundMine(Number(target.dataset.t)+width-1)
                aroundMine(Number(target.dataset.t)+width)
                aroundMine(Number(target.dataset.t)+width+1)
              }
    
            }
          }
        }
        
        let openedCount = tmpArr.filter(item => item[1] === 'open').length
        setHowManyOpen(openedCount)
        if (openedCount === total - howManyMines && flagCount === howManyMines) {
          setSuc(true)
          setGameStatus(null);
        }
        setArr(tmpArr)
        if (tmpStepArr.length !== 0) {
          setSteps([...steps, tmpStep])
        }
        // setSteps(newStep)
      }
   

  }

  let mines;
  if (arr !== undefined) {
      mines = arr.map((item, idx)=> {
      const index : number = item[0] as number
      const status : string = item[1] as string
      const mine : string = item[2] as string
      const around : number = item[3] as number
      const flagB : boolean = item[4] as boolean

      return (
        <MineBox storeWidth={storeWidth} mineSize={mineBoxSize} onTouchStart={onMouseDown} onTouchEnd={onMouseUp} canClick={suc || fail}  status={status} mine={mine} key={idx} data-x={index%10}  data-y={Math.floor(index/10)} data-t={index} around={around} flag={flagB}> {(around !== 0 && status === 'open' && mine === 'normal') && around} {(flagB === true && status === 'closed') && 'F'}</MineBox>
      )
    })
  }

  //// 타이머 기능 구현
  function timerSet () {
    const nowTime = new Date();

    let nowMilli = nowTime.getMilliseconds()
    let nowSecond = nowTime.getSeconds()
    let nowMin = nowTime.getMinutes()

    let startMilli = startTime.milli
    let startSecond = startTime.sec
    let startMin = startTime.min


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
    setPostObj({...postObj, timePlayed : dur})
  };

  useInterval(timerSet, gameStatus)

  /// 성공 데이터 전송

  useEffect(() => {
    let tmpArMines = postObj.nearbyMines?.slice() as number[]
    let tmpMiArr : string[] = postObj.isMine?.slice() as string[]


    for (let i=0; i<tmpMiArr?.length ; i++) {
      if (tmpMiArr[i] === 'mine') {
        tmpArMines[i] = -1;
      }
    }

    let tmpObj = {...postObj};
    delete tmpObj.isMine


    setPostObj({...tmpObj, nearbyMines : tmpArMines, steps : JSON.stringify(steps)})

  }, [suc])

  const NoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNotice(false)
  }

  return (
    <GameContainer storeWidth={storeWidth}>
      {notice &&
        <NoticeBox>본 사이트는 PC환경을 위해 만들어졌지만 <br/> 모바일 환경에서도 플레이할 수 있습니다.<br/> 다만 모바일에서 플레이시 가로모드 <br/> 환경에서  플레이하는 것을 권장합니다 <br/> 모바일에서 우클릭은 길게 터치하면 됩니다
        <OkBox onClick={NoticeClick}>확인!</OkBox>
        </NoticeBox>
      }
      <GameInfoBox  storeWidth={storeWidth}>
        <GameInfoItem>지뢰 : {howManyMines - flagCount}</GameInfoItem>
        <GameInfoItem>Flag : {flagCount}</GameInfoItem>
        <GameInfoItem>time : {(suc || fail || gameStatus !== null)  ? `${timer.min}:${timer.sec}:${Math.floor(timer.milli / 10)}` : '0:00:00'}</GameInfoItem>
      </GameInfoBox>
      {width !== undefined && 
        <GameBox width={width} height={height} storeWidth={storeWidth} mineSize={mineBoxSize}>
          {arr !== undefined && mines}
        </GameBox>
      }
      <FailBox condition={fail} storeWidth={storeWidth}> 실패 ~
        <RetryButton storeWidth={storeWidth} onClick={reTry} >다시하기</RetryButton>
      </FailBox>
      <SucessBox condition={suc} storeWidth={storeWidth}> 성공 ~
        <RetryButton storeWidth={storeWidth} onClick={reTry} style={{minWidth : 200, width : storeWidth/6.26, maxWidth : 480 }} >다시하기 {`&`} 기록 전송 </RetryButton>
      </SucessBox>

    </GameContainer>
  )
}

const NoticeBox = styled.div`
  width: 320px;
  height: 300px;
  background-color: black;
  opacity: 0.8;

  position: absolute;

  color: wheat;

  text-align: center;
  padding: 10px;
  padding-top:  50px;

  box-sizing: border-box;

  font-size: 15px;

  left: 50%;
  transform: translateX(-50%);

  z-index: 9999;
`
const OkBox = styled.button`
  width: 100px;
  height: 30px;
  border: none;

  color: white;
  background-color: gray;
  font-weight: 900;

  position: absolute;
  top : 200px;
  left: 50%;
  transform: translateX(-50%);
`

const GameContainer = styled.section<{storeWidth : number}>`
  // 드래그 방지
  -webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
  // 드래그 방지 

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 100px;

`

const GameInfoBox = styled.div<{storeWidth :number}>`
  width: 350px;
  height: 50px;


  ${props => props.storeWidth < 1250 && {fontSize : 16}};

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`

const GameInfoItem = styled.div`
  width: 25%;
  text-align: center;
  white-space: nowrap;
`

const GameBox = styled.div<{width : number, height : number, storeWidth : number, mineSize : number}>`
  ${props => props.width && {width : props.width * props.mineSize, height : props.height * props.mineSize}}
  min-width: ${props => `${props.width * 20}px`};
  min-height: ${props => `${props.height * 20}px`};
  border : 1px solid;
  border-radius: 10px;
  background-color: #49add8;

  ${props => props.storeWidth >= 3000 && {padding : 12}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {padding : `${props.storeWidth/250}px`}};
  ${props => props.storeWidth < 1250 && {padding : 5}};

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 20px;

  display : grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows : repeat(${props => props.height}, 1fr);
`

const MineBox = styled.div<{status : string, mine : string, around : number, flag : boolean, canClick : boolean, mineSize : number, storeWidth : number}>`
  width: ${props => `${props.mineSize}px`};
  height: ${props => `${props.mineSize}px`};

  min-width: 20px;
  min-height: 20px;
  max-width: 60px;
  max-height: 60px;

  font-size: 17px;

  ${props => props.storeWidth >= 3000 && {fontSize : 41}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/73.5}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 14}};

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

const FailBox = styled.div<{condition : boolean , storeWidth : number}>`
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



const RetryButton = styled.button<{ storeWidth : number}>`
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
  font-size: 15px;
  ${props => props.storeWidth >= 3000 && {fontSize : 36}};
  ${props => (props.storeWidth < 3000 && props.storeWidth >= 1250 )&& {fontSize : `${props.storeWidth/84}px`}};
  ${props => props.storeWidth < 1250 && {fontSize : 15}};
  font-weight: bolder;
  
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
`