import { useState } from 'react'

import Ground from "../../src/section/ground";
import TestSidebar from "../../src/component/test-sidebar";

export default function test ({nMe, nEvaluationDetail, nQuizList}) {

  const [vnc, setVnc] = useState(false);
  const [ip, setIp] = useState('http://'+nEvaluationDetail.containerIp);

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
      nMe: nMe?.data ? nMe?.data : {},
      nEvaluationDetail: nEvaluationDetail.data?.course ? nEvaluationDetail.data?.evaluation.filter((item)=>item.evaluationId==ctx.query.id).map((item)=>{item.thumnailImageUrl="https://cdn.inflearn.com/public/courses/327762/cover/d37b231e-411f-4358-9b28-e3839f79f42b/327762-eng.png";return item;})[0] : {},
      nQuizList: nQuizList.data ? nQuizList.data : []
    }
}
}
