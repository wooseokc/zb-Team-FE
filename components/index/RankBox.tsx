import React from "react";
import styled from "styled-components";

export default function RankBox () {

  return (
    <>
      <Box>
        랭킹 박스
      </Box>
    </>

  )
}

const Box = styled.section`
  width : 300px;
  height : 350px;
  border : 1px solid;

  position: relative;
  top: 50px;
  left : 50%;
  transform: translateX(-50%);
`

