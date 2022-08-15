import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInterval from "../hooks/useInterval";

interface props {
  width : number,
  height : number,
  mine : number
}

export default function GameSection (props : props) {
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
  const [duration, setDuration] = useState(0);
  const [postObj, setPostObj] = useState<{
    gamerId? : number,
    width? : number,
    height? : number,
    numMines? : number

    isOpened? : string[],
    isMine? : string[],
    nearbyMines? : number[],
    isFlagged? : boolean[],

    timePlayed? : number,
    isAnon? : boolean,
    
    steps? : (number | number [])[][]
  }>({})

  // 지뢰 심는 작업
  useEffect(()=> {
    let tmpArr = Array(total).fill(0).map((item, idx) => [idx, 'closed', 'normal', 0, false]);
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

    setPostObj({width : width, height : height, numMines : howManyMines, isOpened : openArr, isMine : mineArr, nearbyMines : aroundArr, isFlagged : flagArr, isAnon : true, timePlayed : 0, steps: []})

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

      setPostObj({width : width, height : height, numMines : howManyMines, isOpened : openArr, isMine : mineArr, nearbyMines : aroundArr, isFlagged : flagArr, isAnon : true, timePlayed : 0})
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
    if (tmpArr[targetIndex][2] === 'mine') {
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
          flagCount ++;
        }
        if (tmpArr[targetIndex-width] && tmpArr[targetIndex-width][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex-width+1] && tmpArr[targetIndex-width+1][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex-1] && tmpArr[targetIndex-1][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex+1] && tmpArr[targetIndex+1][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex+width-1] && tmpArr[targetIndex+width-1][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex+width] && tmpArr[targetIndex+width][4] === true) {
          flagCount ++;
        }
        if (tmpArr[targetIndex+width+1] && tmpArr[targetIndex+width+1][4] === true) {
          flagCount ++;
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
    if (openedCount === total - howManyMines) {
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
    if (suc) {
      console.log(JSON.stringify(postObj))
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
    setPostObj({width : width, height : height, numMines : howManyMines, isOpened : openArr, isMine : mineArr, nearbyMines : aroundArr, isFlagged : flagArr, isAnon : true, timePlayed : 0})
    setArr(tmpArr)
    setFail(false)
    setSuc(false)
    setFlagCount(0)
    setGameStatus(null)
    setSteps([])
    
  }

  const flag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget
    const targetIndex : number = Number(target.dataset.t);

    let tmpStep = [2, targetIndex, [targetIndex]];

    let tmpArr = arr.slice();
    if (tmpArr[targetIndex][1] === 'closed') {
      setSteps([...steps, tmpStep])
      if (tmpArr[targetIndex][4] === true) {
        tmpArr[targetIndex][4] = false
        setFlagCount(c => c - 1);
      }
      else {
        tmpArr[targetIndex][4] = true;
        setFlagCount(c => c + 1);
      }
    }

    setArr(tmpArr)
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
        <MineBox onClick={boxClick} onContextMenu={flag} canClick={suc || fail}  status={status} mine={mine} key={idx} data-x={index%10}  data-y={Math.floor(index/10)} data-t={index} around={around} flag={flagB}> {(around !== 0 && status === 'open' && mine === 'normal') && around} {(flagB === true && status === 'closed') && 'F'}</MineBox>
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
    setDuration(dur)
    setPostObj({...postObj, timePlayed : dur})
  };

  useInterval(timerSet, gameStatus)

  /// 성공 데이터 전송

  useEffect(() => {
    setPostObj({...postObj, steps : steps})
  }, [suc])



  return (
    <GameContainer>
      <GameInfoBox>
        <GameInfoItem>지뢰 : {howManyMines}</GameInfoItem>
        <GameInfoItem>Flag : {flagCount}</GameInfoItem>
        <GameInfoItem>time : {(suc || fail || gameStatus !== null)  ? `${timer.min}:${timer.sec}:${Math.floor(timer.milli / 10)}` : '0:00:00'}</GameInfoItem>
      </GameInfoBox>
      {width !== undefined && 
        <GameBox width={width} height={height}>
          {arr !== undefined && mines}
        </GameBox>
      
      }
      <FailBox condition={fail}> 실패 ~
        <RetryButton onClick={reTry} >다시하기</RetryButton>
      </FailBox>
      <SucessBox condition={suc}> 성공 ~
        <RetryButton onClick={reTry} >다시하기</RetryButton>
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

const GameInfoBox = styled.div`
  width: 350px;
  height: 50px;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`

const GameInfoItem = styled.div`
  width: 80px;
  height: 30px;

  text-align: center;
  white-space: nowrap;
`

const GameBox = styled.div<{width : number, height : number}>`
  ${props => props.width && {width : props.width *25, height : props.height * 25}}
  border : 1px solid;
  border-radius: 10px;
  background-color: #49add8;

  padding: 5px;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 20px;

  display : grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows : repeat(${props => props.height}, 1fr);
`

const MineBox = styled.div<{status : string, mine : string, around : number, flag : boolean, canClick : boolean}>`
  width: 25px;
  height: 25px;
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

const FailBox = styled.div<{condition : boolean}>`
  width :300px;
  height : 200px;
  background : black;
  opacity : 0.8;

  font-size: 30px;
  color : white;

  position: absolute;
  top : 100px;
  left : 50%;
  transform: translateX(-50%);

  ${props => props.condition === false ? {display : 'none'} : {display : 'block'}}

  text-align: center;
  align-items: center;
`
const SucessBox = styled.div<{condition : boolean}>`
  width :300px;
  height : 200px;
  background : black;
  opacity : 0.8;

  font-size: 30px;
  color : white;

  position: absolute;
  top : 100px;
  left : 50%;
  transform: translateX(-50%);

  ${props => props.condition === false ? {display : 'none'} : {display : 'block'}}

  text-align: center;
  align-items: center;
`



const RetryButton = styled.button`
  background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer;

  width : 100px;
  height : 30px;
  background : #66FFFF;

  color: #000033;
  font-size: 15px;
  font-weight: bolder;
  
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
`