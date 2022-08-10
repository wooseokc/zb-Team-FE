import React from "react";
import styled from "styled-components";

export default function AccountBox () {

  return (
    <Stylesection>
      <button>회원가입</button>
    </Stylesection>
  )
}

const Stylesection = styled.section`
  position: relative;
  top: 100px;
  /* border: 1px solid black; */
  margin: 0 auto;
  display: flex;
  justify-content: center;

  button {
    width: 100px;
    height: 50px;
  }
`;

