import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';
import { JsxAttribute } from "typescript";

export default function MyPage () {
  const [listItems, setListItems] = useState<JSX.Element>()
  const router = useRouter()
  useEffect(() => {
    let list; 
    if (sessionStorage.getItem('gamerId')) {
      let gamerId = sessionStorage.getItem('gamerId')
      axios.get(`http://34.168.232.38:8080/minesweeper/game/list/${gamerId}`).then(res => {
        console.log(res.data)

        list = new Array(res.data.gameList.length)
        for (let i = 0; i < list.length ; i ++) {
          let tmpArr = [res.data['createdAtList'][i], res.data['difficultyList'][i], res.data['timeList'][i], res.data['gameList'][i]];
          list[i] = tmpArr.slice()
        }

        let lists = list.map((items, idx) => {
          const createdAt : string = items[0] 
          const difficulty : string = items[1]
          const playTime : string = items[2]
          const gameId : string = items[3]

          return (
            <button key={gameId} value={gameId} onClick={goToGame}> {createdAt} :  {difficulty} : {playTime} </button>
          )
        })

        setListItems(lists)

        console.log(list)
     
      }).catch(() => {
        console.log('err')
      })
  
  
    } else {
      console.log('no Id')
    }

  }, [])





  const goToGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value =  e.currentTarget.value
    router.push(`/info/mylastgame/${value}`)
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    console.log(sessionStorage.getItem('gamerId'))
    console.log(localStorage.getItem('accessToken'))
    console.log(localStorage.getItem('refreshToken'))
    console.log(localStorage)
  }

  const onSubmit2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('wait')
    await axios.get('https://minesweeper.hanjoon.dev/minesweeper/gamer/email/abcd@naver.com').then(res => {
     
      console.log(res.data)
   
    })
  }

  const onPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('wait')
    const data = {
      email : "abcd@naver.com",
      name : '홍길동',
      password : '1234'
    }
    await axios.post(`http://34.168.232.38:8080/minesweeper/gamer`, (data)).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }

  const clearStore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.clear()
    sessionStorage.clear()
  }
  const ListGet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let gamerId = sessionStorage.getItem('gamerId')
    console.log(gamerId)

    await axios.get(`http://34.168.232.38:8080/minesweeper/game/list/${gamerId}`).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }
  const GameGet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let gamerId = sessionStorage.getItem('gamerId')
    console.log(gamerId)

    await axios.get(`https://minesweeper.hanjoon.dev/minesweeper/game/15`).then(res => {
     
      console.log(res.data)
   
    }).catch(() => {
      console.log('err')
    })
  }

  return (
    <MyPageSection>
      <MyPageItem>
        {listItems}
      </MyPageItem>
      <MyPageItem>
        나의 업적 등등
        <button onClick={onSubmit}>stroge</button>
        <button onClick={onSubmit2}>get</button>
        <button onClick={onPost}>post</button>
        <button onClick={clearStore}>clear</button>
        <button onClick={ListGet}>List</button>
        <button onClick={GameGet}>gmaeGet</button>

      </MyPageItem>


    </MyPageSection>

  )

}

const MyPageSection = styled.section`
  width : 50%;
  height : 600px;
  border : 1px solid;

  position : relative;
  left : 50%;
  transform: translateX(-50%);
  top : 30px;

  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const MyPageItem = styled.div`
  width : 400px;
  height : 250px;
  border : 1px solid;

  
`