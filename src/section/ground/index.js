import { useState, useEffect } from 'react'
import * as S from "./styles"

const Ground = ({ vnc, handleVncConnect, handleVncDisconnect, ip }) => {

  return (
    <S.Container>
      {vnc ? <S.VncView src={ip} /> : <div>컨테이너를 실행시켜주세요</div>}
    </S.Container>
  )
}

export default Ground
