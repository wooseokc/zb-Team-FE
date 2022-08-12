import React from "react";
import styled from "styled-components";

export default function MyPage () {



  return (
    <MyPageSection>
      <MyPageItem>
        나의 이전 플레이
      </MyPageItem>
      <MyPageItem>
        나의 업적 등등
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