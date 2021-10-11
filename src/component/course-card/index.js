import React from 'react'
import { useRouter } from "next/router";

import * as S from "./styles";

const CourseCard = ({ viewOnly, title, instructor, thumnailImageUrl }) => {
  const router = useRouter();
  return (
    <S.Container>
      <S.Thumnail src={thumnailImageUrl} />
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <S.Instructor>강사 : {instructor}</S.Instructor>
      </S.TextWrapper>
      {viewOnly ? <></> : <S.ButtonWrapper><S.Button onClick={() => router.push("/course")}>입장하기</S.Button> </S.ButtonWrapper>}
    </S.Container>
  )
}

export default CourseCard
