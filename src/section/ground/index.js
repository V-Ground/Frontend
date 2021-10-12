import React, { useEffect } from 'react'
import dynamic from "next/dynamic";
import VncDisplay from "react-vnc-display";
import * as S from "./styles"

const Ground = () => {


  return (
    <S.Container>
      <div>컨테이너를 실행시켜주세요</div>
      <S.VncWrapper>
        <VncDisplay url="ws://13.125.162.194:5900" />
      </S.VncWrapper>
    </S.Container>
  )
}

export default Ground
