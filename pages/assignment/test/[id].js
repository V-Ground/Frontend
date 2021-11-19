import React from 'react'

import TestAssignment from "../../../src/section/test-assignment";
import AdminTestMain from "../../../src/section/admin-test-main";
import axios from 'axios';

export default function assignment ({nMe, nEvaluationDetail, nStudentList, nQuizList}) {
  console.log('evaluation : ', nEvaluationDetail);
  return nMe.role=='강사' ? <div style={{ width: "100%" }}><AdminTestMain nMe={nMe} nEvaluationDetail={nEvaluationDetail} nStudentList={nStudentList} nQuizList={nQuizList} /></div> : <TestAssignment nMe={nMe} nEvaluationDetail={nEvaluationDetail} nQuizList={nQuizList} />
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
    console.log('nError : ',err);
    if(err?.response?.status == 403 || err?.response?.status == 401){
      console.log('로그인 전');
    }
  }

  return {
    props: {
      nMe: nMe?.data ? nMe?.data : {},
      nEvaluationDetail: nEvaluationDetail.data?.evaluation ? nEvaluationDetail.data?.evaluation.filter((item)=>item.evaluationId==ctx.query.id).map((item)=>{item.thumnailImageUrl="https://cdn.inflearn.com/public/courses/327762/cover/d37b231e-411f-4358-9b28-e3839f79f42b/327762-eng.png";return item;})[0] : {},
      nQuizList: nQuizList.data ? nQuizList.data : [],
      nStudentList: []
    }
}
}