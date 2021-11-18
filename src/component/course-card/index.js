import React from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

import * as S from "./styles";

const CourseCard = ({ viewOnly, title, instructor, thumnailImageUrl, checker, spaceId }) => {
  const router = useRouter();
  const link = checker=='class' ? `/ground/${spaceId}` : `/test-ground/${spaceId}`;
  return (
    <S.Container>
      <Link href={checker=='class' ? `/assignment/class/${spaceId}` : `/assignment/test/${spaceId}`}>
      <S.Thumnail src={thumnailImageUrl} />
      </Link>
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <S.Instructor>강사 : {instructor}</S.Instructor>
      </S.TextWrapper>
      {viewOnly ? <></> : <S.ButtonWrapper><S.Button onClick={() => router.push(link)}>입장하기</S.Button> </S.ButtonWrapper>}
    </S.Container>
  )
}

export default CourseCard
