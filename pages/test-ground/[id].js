import { useState } from 'react'

import Ground from "../../src/section/ground";
import TestSidebar from "../../src/component/test-sidebar";

export default function test ({nMe, nEvaluationDetail, nQuizList}) {

  const [vnc, setVnc] = useState(false);
  const [ip, setIp] = useState(nEvaluationDetail.containerIp);

  const handleVncConnect = (ip) => {
    setVnc(true);
    setIp(ip);
  }

  const handleVncDisconnect = () => {
    setVnc(false);
  }

  return (
    <>
      <TestSidebar handleVncConnect={handleVncConnect} handleVncDisconnect={handleVncDisconnect} nMe={nMe} nEvaluationDetail={nEvaluationDetail} nQuizList={nQuizList} />
      <Ground vnc={vnc} ip={ip} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  let nMe = {};
  let nEvaluationDetail = {};
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
      nEvaluationDetail: nEvaluationDetail.data?.course ? nEvaluationDetail.data?.evaluation.filter((item)=>item.evaluationId==ctx.query.id).map((item)=>{item.thumnailImageUrl="https://cdn.inflearn.com/public/courses/327762/cover/d37b231e-411f-4358-9b28-e3839f79f42b/327762-eng.png";return item;})[0] : {
        "evaluationId": 1,
        "title": "BoB 선발 평가",
        "description": "Best Of the Best 11기 보안제품개발트랙 선발 평가",
        "visibility": true,
        "teacherName": "정승기"
      },
      nQuizList: nQuizList.data ? nQuizList.data : [
        {
            "quizId": 1,
            "question": "공격자의 정보 파악하기",
            "description": "공격자의 IP 는 무엇인가?",
            "score": 100
        },
        {
            "quizId": 2,
            "question": "공격자가 탈취한 파일은?",
            "description": "공격자가 탈취한 파일을 *.* 형식의 확장자 타입을 지켜 입력하세요",
            "score": 100
        },
        {
            "quizId": 3,
            "question": "리버싱",
            "description": "공격자가 감염시킨 파일을 분석하고 flag 를 획득하세요",
            "score": 100
        }
    ]
    }
}
}
