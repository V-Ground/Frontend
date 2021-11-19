import React from 'react'
import Link from "next/link";

import * as S from "./styles";
import { data } from "./data";

import Divider from '@mui/material/Divider';

import WhiteBackground from "../../component/white-background";
import CourseCard from "../../component/course-card";

const MyCourse = ({ isAdmin, nClass, nEvaluation, nMe }) => {

  const { courses, tests } = data;
  console.log('nClass : ',nClass);
  console.log('nEvaluation : ',nEvaluation);
  return (
    <S.Container>
      <WhiteBackground>
        {nMe.role=='강사' ? <S.AdminHeader><S.Title></S.Title><div style={{ display: "flex" }}><Link href="/admin/create"><S.Text style={{ cursor: "pointer" }}>클래스 생성하기</S.Text></Link><Link href="/admin/create-test"><S.Text style={{ cursor: "pointer" }}>테스트 생성하기</S.Text></Link></div></S.AdminHeader> : <S.Title> 진행 중인 클래스 및 테스트</S.Title>}
        <Divider />
        <S.CourseWrapper>
          <S.ClassWrapper>
            <S.Title>내가 참여하는 클래스</S.Title>
            <S.CardWrapper>
              {nClass.map(course => <div key={course.courseId}>
                <CourseCard spaceId={course.courseId} title={course.title} instructor={course.teacherName} thumnailImageUrl={course.thumnailImageUrl} checker={'class'} />
              </div>)}
            </S.CardWrapper>
          </S.ClassWrapper>
          <S.TestWrapper>
            <S.Title>내가 참여하는 테스트</S.Title>
            <S.CardWrapper>
              {nEvaluation.map(test => <div key={test.evaluationId}>
                <CourseCard spaceId={test.evaluationId} title={test.title} instructor={test.teacherName} thumnailImageUrl={test.thumnailImageUrl} checker={'test'} />
              </div>)}
            </S.CardWrapper>
          </S.TestWrapper>
        </S.CourseWrapper>
      </WhiteBackground>
    </S.Container>
  )
}


export default MyCourse