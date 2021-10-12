import React from 'react'
import Link from "next/link";
import * as S from "./styles";

const GroundHeader = () => {
  return (
    <S.Container>
      <Link href="/">
        <S.Title>V-Ground</S.Title>
      </Link>
    </S.Container>
  )
}

export default GroundHeader
