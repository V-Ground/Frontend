import React, { useState, useRef, useEffect, Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import OrganizationHeader from "../src/component/organization-header";
import MyCourse from "../src/section/my-course";

export default function MainPage(props) {
  const router = useRouter();
  console.log('props : ', props);
  console.log('query : ', router.query);
  const {nClass, nEvaluation} = props;
  return (
    <div>
      <Head>
        <title>
          Main | V-Ground
        </title>
      </Head>
      <OrganizationHeader nClassLength={nClass.length} nEvaluationLength={nEvaluation.length}>
        { router.query?.uid ?
            <MyCourse nClass={nClass} nEvaluation={nEvaluation} />
          : ''        
        }
      </OrganizationHeader>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  let nParticipating = {};
  try {
    nParticipating = await axios.get(`/v1/users/${ctx.query.uid}/participating`);
  } catch(err) {
    if(err?.response?.status == 403 || err?.response?.status == 401){
      console.log('로그인 전');
    }
  }
  return {
    props: {
      nClass: nParticipating?.data ? nParticipating?.data?.course : [
        {
          "courseId": 1,
          "title": "클라우드 기초",
          "description": "aws 를 이용하여 클라우드 컴퓨팅의 기초에 대해서 학습합니다.",
          "visibility": true,
          "teacherName": "정승기", 
          "thumnailImageUrl": "https://cdn.inflearn.com/public/courses/326750/cover/d7815167-2a01-42c1-aacf-bbd32a3705bc/326750-eng.png"
        },
        {
          "courseId": 2,
          "title": "Wireshark 를 이용한 네트워크 분석",
          "description": "TCP/IP Stack 의 전반적인 구조를 Wireshark 를 통하여 학습하고 전반적인 네트워크를 학습합니다.",
          "visibility": true,
          "teacherName": "정승기",
          "thumnailImageUrl": "https://cdn.inflearn.com/public/courses/327762/cover/d37b231e-411f-4358-9b28-e3839f79f42b/327762-eng.png"
        }
      ],
      nEvaluation: nParticipating?.data ? nParticipating?.data.evaluation : [
        {
          "evaluationId": 1,
          "title": "BoB 선발 평가",
          "description": "Best Of the Best 11기 보안제품개발트랙 선발 평가",
          "visibility": true,
          "teacherName": "정승기",
          "thumnailImageUrl": "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202107/101320-463/브릿지이미지.png"
        }
      ]
    }
}
}