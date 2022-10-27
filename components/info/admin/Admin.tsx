import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";



export default function AdminPage () {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<JSX.Element[]>()
  


  const router = useRouter()
  useEffect(() => {
    axios.get(`https://minesweeper.hanjoon.dev:443/minesweeper/gamer/${sessionStorage.getItem('gamerId')}`).then(res => {
      
    }).catch(err => {
      router.push(`/`)
    })

  }, [])

  const searchBox = (e : React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const userBan = async (e : React.MouseEvent<HTMLButtonElement>) => {
    await axios.delete(`https://minesweeper.hanjoon.dev:443/minesweeper/gamer/${e.currentTarget.value}`).then(res =>{
      console.log(res)
    })
  }
  const userSuspend = async (e : React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerHTML === '정지하기') {
      await axios.patch(`https://minesweeper.hanjoon.dev:443/minesweeper/gamer/${e.currentTarget.value}/suspension/true`).then(res => {
        console.log(res)
      })
    } else {
      await axios.patch(`https://minesweeper.hanjoon.dev:443/minesweeper/gamer/${e.currentTarget.value}/suspension/false`).then(res => {
        console.log(res)
      })
    }

  }

  
  const searchClick = async (e : React.MouseEvent<HTMLInputElement>) => {
    await axios.get(`https://minesweeper.hanjoon.dev:443/minesweeper/gamer/search?keyword=${encodeURI(search)}`).then(res => {
      console.log(res)
      
      const list : JSX.Element[] = res.data.map((item, idx) => {
        

        return (
          <UserItem key={item.name}>
            <div>
            <span>{item.name}</span>
            <br/>
            <span>{item.mail}</span>

            </div>

            <button onClick={userBan} value={item.id}>탈퇴</button>
            {item.suspend ?
            <button onClick={userSuspend} value={item.id}>정지풀기</button>
            :
            <button onClick={userSuspend} value={item.id}>정지하기</button>
          }
          </UserItem>
        )
      })

      setUsers(list)
    })
  }




  return (
    <AdminSection>
      <SearchDiv>
        <input type={'text'} onChange={searchBox}></input>
        <input type={'submit'} onClick={searchClick} value={'회원검색'}></input>

      </SearchDiv>
      <UserList>
        {users}
      </UserList>
    </AdminSection>
  )
}

const AdminSection = styled.section`
  width: 600px;
  height: 700px;

  border: 1px solid;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

`

const SearchDiv = styled.div`
  width: 80%;
  height: 50px;


  position: relative;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  
`

const UserList = styled.div`
  width: 80%;
  height: 500px;

  border: 1px solid;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

  justify-content: center;

  overflow-y: scroll;
`

const UserItem = styled.div`
  width: 90%;
  height: 45px;

  border: 1px solid;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  
`

