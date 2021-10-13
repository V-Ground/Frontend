import React from 'react'
import Link from "next/link";

import * as S from "./styles";
import { data } from "./data";

import Divider from '@mui/material/Divider';

import WhiteBackground from "../../component/white-background";
import CourseCard from "../../component/course-card";

const MyCourse = ({ isAdmin }) => {

  const { courses, tests } = data;

  return (
    <S.Container>
      <WhiteBackground>
        {isAdmin ? <S.AdminHeader><S.Title>내가 참여하는 클래스</S.Title><div style={{ display: "flex" }}><Link href="/admin/create"><S.Text style={{ cursor: "pointer" }}>클래스 생성하기</S.Text></Link><Link href="/admin/create-test"><S.Text style={{ cursor: "pointer" }}>테스트 생성하기</S.Text></Link></div></S.AdminHeader> : <S.Title>진행중인 클래스 및 테스트</S.Title>}
        <Divider />
        <S.CourseWrapper>
          <S.ClassWrapper>
            <S.Title>내가 참여하는 클래스</S.Title>
            <S.CardWrapper>
              {courses.map(course => <div key={course.id}>
                <CourseCard title={course.title} instructor={course.instructor} thumnailImageUrl={course.thumnailImageUrl} />
              </div>)}
            </S.CardWrapper>
          </S.ClassWrapper>
          <S.TestWrapper>
            <S.Title>내가 참여하는 테스트</S.Title>
            <S.CardWrapper>
              {tests.map(test => <div key={test.id}>
                <CourseCard title={test.title} instructor={test.instructor} thumnailImageUrl={test.thumnailImageUrl} />
              </div>)}
            </S.CardWrapper>
          </S.TestWrapper>
        </S.CourseWrapper>
      </WhiteBackground>
    </S.Container>
  )
}


export default MyCourse