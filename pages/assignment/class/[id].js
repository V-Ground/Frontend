import React from 'react'

import CourseAssignment from "../../../src/section/course-assignment";
import AdminCourseMain from "../../../src/section/admin-course-main";
import axios from 'axios';

export default function assignment({ nMe, nClassDetail, nStudentList, nQuizList, nInteractionList }) {
  return nMe.role == '강사' ? <div style={{ width: "100%" }}><AdminCourseMain nMe={nMe} nClassDetail={nClassDetail} nStudentList={nStudentList} nQuizList={nQuizList} nInteractionList={nInteractionList} /></div> : <CourseAssignment nMe={nMe} nClassDetail={nClassDetail} nQuizList={nQuizList} />
}

export const getServerSideProps = async (ctx) => {
  let nMe = {};
  let nClassDetail = {};
  let nStudentList = [];
  let nQuizList = [];
  let nInteractionList = [];

  // 이용자정보 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nMe = await axios.get(`/v1/authenticate/me`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch (err) {
    if (err?.response?.status == 403 || err?.response?.status == 401) {
      console.log('로그인 전');
    }
  }

  // 수업정보 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nClassDetail = await axios.get(`/v1/users/${nMe.data?.id}/participating`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch (err) {
    if (err?.response?.status == 403 || err?.response?.status == 401) {
      console.log('로그인 전');
    }
  }

  //퀴즈 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nQuizList = await axios.get(`/v1/courses/${ctx.query.id}/assignments`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch (err) {
    if (err?.response?.status == 403 || err?.response?.status == 401) {
      console.log('로그인 전');
    }
  }

  // 강사일 경우, 수강학생 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nStudentList = await axios.get(`/v1/users/${nMe.data?.id}/courses/${ctx.query.id}`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch (err) {
    if (err?.response?.status == 403 || err?.response?.status == 401) {
      console.log('로그인 전');
    }
  }

  // 인터렉션 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nInteractionList = await axios.get(`/v1/interactions/courses/${ctx.query.id}`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch (err) {
    if (err?.response?.status == 403 || err?.response?.status == 401) {
      console.log('로그인 전');
    }
  }

  return {
    props: {
      nMe: nMe?.data ? nMe?.data : {},
      nClassDetail: nClassDetail.data?.course ? nClassDetail.data?.course.filter((item) => item.courseId == ctx.query.id).map((item) => { item.thumnailImageUrl = "https://cdn.inflearn.com/public/courses/327762/cover/d37b231e-411f-4358-9b28-e3839f79f42b/327762-eng.png"; return item; })[0] : {},
      nQuizList: nQuizList.data ? nQuizList.data : [],
      nStudentList: nStudentList.data ? nStudentList.data.filter((item) => nMe.data.id != item.studentId) : [],
      nInteractionList: nInteractionList.data ? nInteractionList.data : [],
    }
  }
}