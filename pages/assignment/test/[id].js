import React from 'react'

import CourseAssignment from "../../../src/section/course-assignment";
import AdminCourseMain from "../../../src/section/admin-course-main";
import axios from 'axios';

export default function assignment ({nMe, nEvaluationDetail, nStudentList, nQuizList}) {
  return nMe.role=='강사' ? <div style={{ width: "100%" }}><AdminCourseMain nMe={nMe} nEvaluationDetail={nEvaluationDetail} nStudentList={nStudentList} nQuizList={nQuizList} /></div> : <CourseAssignment nMe={nMe} nEvaluationDetail={nEvaluationDetail} nQuizList={nQuizList} />
}

export const getServerSideProps = async (ctx) => {
  let nMe = {};
  let nEvaluationDetail = {};
  let nStudentList = [];
  let nQuizList = [];

  // 이용자정보 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nMe = await axios.get(`/v1/authenticate/me`, {
      headers: {
          Cookie: cookies
      },
      withCredentials : true
    });
  } catch(err) {
    if(err?.response?.status == 403 || err?.response?.status == 401){
      console.log('로그인 전');
    }
  }

  // 수업정보 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nEvaluationDetail = await axios.get(`/v1/users/${nMe.data?.id}/participating`, {
      headers: {
          Cookie: cookies
      },
      withCredentials : true
    });
  } catch(err) {
    if(err?.response?.status == 403 || err?.response?.status == 401){
      console.log('로그인 전');
    }
  }

  //퀴즈 조회
  try {
    const cookies = ctx.req.headers.cookie;
    nQuizList = await axios.get(`/v1/evaluations/${ctx.query.id}/quizzes`, {
      headers: {
          Cookie: cookies
      },
      withCredentials : true
    });
  } catch(err) {
    if(err?.response?.status == 403 || err?.response?.status == 401){
      console.log('로그인 전');
    }
  }

  return {
    props: {
      nMe: nMe?.data ? nMe?.data : {
        "id": 6,
        "email": "teacher1@vground.com",
        "username": "정승기",
        "role": "강사"
      },
      nEvaluationDetail: nEvaluationDetail.data?.evaluation ? nEvaluationDetail.data?.evaluation.filter((item)=>item.evaluationId==ctx.query.id) : {
        "evaluationId": 1,
        "title": "BoB 선발 평가",
        "description": "Best Of the Best 11기 보안제품개발트랙 선발 평가",
        "visibility": true,
        "teacherName": "정승기"
      },
      nQuizList: nQuizList.data ? nQuizList.data : [
        {
          "studentId": 1,
          "studentName": '김경태',
          "containerIp": '127.0.0.1:5901'
        }
      ],
      nStudentList: []
    }
}
}