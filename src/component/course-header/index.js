import React from 'react'
import { useRouter } from "next/router";
import * as S from "./styles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CourseCard from "../course-card";
import SuccessAlert from '../SuccessAlert.js';
import InfoAlert from '../InfoAlert.js';
import WarningAlert from '../WarningAlert.js';

const CourseHeader = ({ isAdmin, title, instructor, thumnailImageUrl, containerStatus, setContainerStatus }) => {

  const router = useRouter();

  const handleClick = () => {
    if (isAdmin) router.push(`/ground/${router.query.id}`);
    else router.push("/ground/1");
  }

  const handleInstanceStart = () => {
    InfoAlert('인스턴스가 시작되었습니다.');
    setContainerStatus('실행 중');
  }

  const handleInstanceStop = () => {
    WarningAlert('인스턴스가 중지되었습니다.');
    setContainerStatus('중지');
  }

  const handleInstanceStopAll = () => {
    WarningAlert('모든 인스턴스가 중지되었습니다.');
    setContainerStatus('중지');
  }

  return (
    <S.Container>
      <S.Back><S.BackLink onClick={()=>{router.push('/')}}><ArrowBackIosNewIcon /></S.BackLink>{title}</S.Back>
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
            <S.Button onClick={handleClick}>클래스 입장</S.Button>
            {/*<S.Button onClick={handleInstanceStart}>인스턴스 시작</S.Button>
            <S.Button onClick={handleInstanceStop}>인스턴스 중지</S.Button>
            {isAdmin && <S.Button onClick={handleInstanceStopAll} style={{ background: "#FA5050", width: "140px" }}>모든 인스턴스 중지</S.Button>}*/}
          </S.ContainerButtons>
        </div>
      </S.Course>
    </S.Container>
  )
}

export default CourseHeader
