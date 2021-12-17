import { useState, useEffect } from 'react'

import Ground from "../../src/section/ground";
import GroundSidebar from "../../src/component/ground-sidebar";
import axios from 'axios';
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ground({ nMe, nClassDetail, nStudentList, nQuizList, nStatusList, nInteractionList }) {
  /*const { data, error } = useSWR(
    "http://58.142.191.143:8080/mouse_keyboard/keyboard",
    fetcher
  );*/

  const [vnc, setVnc] = useState(false);
  const [ip, setIp] = useState('http://' + nClassDetail.containerIp);

  const handleVncConnect = (ip) => {
    setVnc(true);
    setIp(ip);
  }

  const handleVncDisconnect = () => {
    setVnc(false);
  }

  return (
    <>
      <GroundSidebar handleVncConnect={handleVncConnect} handleVncDisconnect={handleVncDisconnect} nMe={nMe} nClassDetail={nClassDetail} nQuizList={nQuizList} nStudentList={nStudentList} nStatusList={nStatusList} nInteractionList={nInteractionList} />
      <Ground vnc={vnc} ip={ip} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  let nMe = {};
  let nClassDetail = {};
  let nStudentList = [];
  let nQuizList = [];
  let nStatusList = [];
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

  try {
    const cookies = ctx.req.headers.cookie;
    nStatusList = await axios.get(`/v1/courses/${ctx.query.id}/task/status`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch(err) {
    if (err?.response?.status == 403 || err?.response?.status == 401) {
      console.log('로그인 전');
    }
  }

  try {
    const cookies = ctx.req.headers.cookie;
    nInteractionList = await axios.get(`/v1/interactions/courses/${ctx.query.id}`, {
      headers: {
        Cookie: cookies
      },
      withCredentials: true
    });
  } catch(err) {
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
      nStatusList: nStatusList.data ? nStatusList.data : [],
      nInteractionList: nInteractionList.data ? nInteractionList.data : []
      // nMe: {
      //   "email": "teacher1@vground.com",
      //   "password": "teacher1",
      //   "role": "강사",
      //   "username": "정승기"
      // },
      // nClassDetail: {
      //   "courseId": 1,
      //   "title": "클라우드 기초",
      //   "description": "aws 를 이용하여 클라우드 컴퓨팅의 기초에 대해서 학습합니다.",
      //   "visibility": true,
      //   "teacherName": "정승기",
      //   "containerIp" : "3.34.94.126"
      // },
      // nQuizList: [
      //   {
      //       "assignmentId": 1,
      //       "title": "클라우드 네트워크",
      //       "description": "클라우드 네트워크에 대한 상식 퀴즈를 풀어보세요",
      //       "startedAt": "2021-11-09T12:00:00",
      //       "endedAt": "2021-11-12T12:00:00"
      //   }
      // ],
      // nStudentList: [{
      //   "studentId" : 1,
      //   "studentName" : "고현수",
      //   "containerIp" : "3.34.94.126",
      //   "role" : "교육생",
      //   "containerStatus" : 1,
      //   "activity": 1 
      // },{
      //   "studentId" : 2,
      //   "studentName" : "장원익",
      //   "containerIp" : "3.34.94.126",
      //   "role" : "교육생",
      //   "containerStatus" : 0,
      //   "activity": 0 
      // }
      // ]
    }
  }
}
