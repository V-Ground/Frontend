import React from 'react'

import * as S from "./styles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CourseCard from "../course-card";

const CourseHeader = ({ title, instructor, thumnailImageUrl, containerStatus }) => {
  return (
    <S.Container>
      <S.Back><ArrowBackIosNewIcon />{title}</S.Back>
      <S.Course>
        <CourseCard
          viewOnly
          title={title}
          instructor={instructor}
          thumnailImageUrl={thumnailImageUrl} />
        <div>
          <div style={{ margin: "10px 0" }}>
            수업 참여 인원 : 21명
          </div>
          <div style={{ margin: "10px 0" }}>
            마지막 수업 시간 : 2021년 09월 10일 13시 21분
          </div>
          <div style={{ margin: "8px 0" }}>
            인스턴스 상태 : {containerStatus}
          </div>
          <S.ContainerButtons>
            <S.Button>인스턴스 실행</S.Button>
            <S.Button>인스턴스 중지</S.Button>
          </S.ContainerButtons>
        </div>
      </S.Course>
    </S.Container>
  )
}

export default CourseHeader
