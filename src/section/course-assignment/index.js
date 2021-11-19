import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';

import * as  S from "./styles";
import { data } from "./data";

import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import CourseHeader from "../../component/course-header";
import Modal from "../../component/modal";
import WhiteBackground from "../../component/white-background";

import SuccessAlert from '../../component/SuccessAlert.js';
import FailureAlert from '../../component/FailureAlert';
import axios from 'axios';
import { TextField } from '@mui/material';


const convertToChip = (string) => {
  if (string === "마감") return <Chip label={string} />
  else if (string === "진행중") return <Chip color="success" label={string} />
}

const CourseAssignment = ({nMe, nClassDetail, nStudentList, nQuizList}) => {
  const router = useRouter();
  const [containerStatus, setContainerStatus] = useState('중지');
  const [quizChildrenList, setQuizChildrenList] = useState(Array.from({length: nQuizList.length}, ()=>{}));
  const [quizChildrenChecker, setQuizChildrenChecker] = useState(Array.from({length: nQuizList.length}, ()=>false));
  const { courseInfo, assignment } = data;
  const userId = nMe?.id;
  const courseId = router.query.id;
  const [assignmentId, setAssignmentId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [questionDescriptionDialog, setQuestionDescriptionDialog] = useState('');
  const [answer, setAnswer] = useState('');

  console.log('query in course assignment :', router.query);

  const [isOpen, setIsOpen] = useState(false);

  const handleQuizChildrenClose = (assignmentId, index) => {
    const copyChecker = quizChildrenChecker.slice();
    copyChecker[index] = false;
    setQuizChildrenChecker(copyChecker);
  };

  const handleQuizChildrenOpen = async (assignmentId, index) => {
    const copyChecker = quizChildrenChecker.slice();
    copyChecker[index] = true;
    setQuizChildrenChecker(copyChecker);
    let nQuizChildrenList = {}
    try {
      nQuizChildrenList = await axios.get(`/v1/users/${nMe.id}/courses/assignments/${assignmentId}/questions/${questionId}/answers`);
    } catch(err) {
      nQuizChildrenList = {"data": {
        "questionDetail": {
            "assignment": {
                "assignmentId": 1,
                "title": "클라우드 네트워크",
                "description": "클라우드 네트워크에 대한 상식 퀴즈를 풀어보세요",
                "startedAt": "2021-11-09T12:00:00",
                "endedAt": "2021-11-12T12:00:00"
            },
            "questions": [
                {
                    "questionId": 1,
                    "question": "Floating IP 란?",
                    "description": "Cloud Computing 에서는 Floating IP에 대한 개념이 중요하다. Floating IP 에 대해서 설명하시오",
                    "score": 100
                },
                {
                    "questionId": 2,
                    "question": "VPC란?",
                    "description": "VPC에 대해서 설명하고 사용 이유를 말하시오",
                    "score": 50
                },
                {
                    "questionId": 3,
                    "question": "CIDR 이란?",
                    "description": "클라우드 컴퓨팅에서 네트워크를 할당하는 CIDR 방식에 대해서 설명하세요",
                    "score": 30
                }
            ]
        },
        "submittedAnswerDetail": [
            {
                "questionId": 2,
                "question": "VPC란?",
                "submittedAnswer": "VPC는 Virtual Private Cloud 의 약자이다",
                "scored": null
            },
            {
                "questionId": 1,
                "question": "Floating IP 란?",
                "submittedAnswer": "Floating IP 는 VPC 외부에서 접근 가능한 public IP로 특정 클라우드 플래폼에서는 Floating IP 를 할당 받는것 만으로도 과금이 된다",
                "scored": null
            }
        ]
    }};
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('로그인이 필요합니다.');
      } else {
        FailureAlert('에러가 발생하였습니다.');
      }
    }
    console.log('nQuizChildrenList',nQuizChildrenList.data)
    const copyList = quizChildrenList.slice();
    copyList[index] =  nQuizChildrenList.data;
    setQuizChildrenList(copyList);
  };

  const handleAnswer = async () => {
    try {
      await axios.post(`/v1/courses/${courseId}/assignments/${assignmentId}/users/${userId}`, {
        'answer' : answer
      })
      SuccessAlert('과제가 성공적으로 제출되었습니다.')
    } catch(err) {
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('로그인이 필요합니다.');
      } else {
        FailureAlert('에러가 발생하였습니다.');
      }
    }
    setIsOpen(false);
  }

  const handleModalClose = () => {
    SuccessAlert('과제가 성공적으로 제출되었습니다.')
    setIsOpen(false);
  }

  const handleModalOpen = (aid,qid,description) => {
    setIsOpen(true);
    setAssignmentId(aid);
    setQuestionId(qid);
    setQuestionDescriptionDialog(description);
  }

  const { 
    title,
    status,
    startedAt,
    endedAt,
    description,
    submitStatus
  } = assignment;

  return (
    <Fragment>
    <S.Container>
      <S.CourseHeaderWrapper>
          <CourseHeader
            title={nClassDetail.title}
            instructor={nClassDetail.teacherName}
            thumnailImageUrl={nClassDetail.thumnailImageUrl}
            containerStatus={containerStatus}
            setContainerStatus={setContainerStatus} />
      </S.CourseHeaderWrapper>
      { nQuizList.map((quiz, index)=> {
        return (<Fragment>
        <S.AssignmentWrapper>
          <WhiteBackground>
            <S.Header>
              <S.Title>{`${index+1} ${quiz.title}`}</S.Title>
              <S.Others>
                <span>{convertToChip(Date.now()-new Date(quiz.endedAt)<0 ? '진행중' : '마감')}</span>
                <span>{new Date(quiz.startedAt).toLocaleDateString()} ~ {new Date(quiz.endedAt).toLocaleDateString()}</span>
              </S.Others>
            </S.Header>
            <Divider />
            <S.Padding style={{ lineHeight: "2" }}>
              <h3>과제 설명</h3>
              {quiz.description}
              <h3 style={{ marginTop: "60px" }}>제출 상황<S.quizChildrenOpen>{quizChildrenChecker[index] ? <span onClick={()=>{handleQuizChildrenClose(quiz.assignmentId, index)}}> 닫기</span> : <span onClick={()=>{handleQuizChildrenOpen(quiz.assignmentId, index)}}> 열기</span>}</S.quizChildrenOpen></h3>
              {quizChildrenChecker[index] ? quizChildrenList[index].questionDetail.questions.map((child)=>{
              return (
              <Fragment>
              <S.AssignmentTableWrapper>
                <S.AssignmentTable>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">제출 상황</TableCell>
                        <TableCell align="left">{quizChildrenList[index].submittedAnswerDetail.filter((item)=>item.questionId==child.questionId).length ? '제출완료' : '제출하지 않음'}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">배점</TableCell>
                        <TableCell align="left">{`${quizChildrenList[index].submittedAnswerDetail.filter((item)=>item.questionId==child.questionId).length && quizChildrenList[index].submittedAnswerDetail.filter((item)=>item.questionId==child.questionId)[0].scored ? quizChildrenList[index].submittedAnswerDetail.filter((item)=>item.questionId==child.questionId)[0].scored : '-'} / ${child.score}`}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">마지막 제출일</TableCell>
                        <TableCell align="left">{submitStatus.lastModifiedAt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">과제 타입</TableCell>
                        <TableCell align="left">{submitStatus.constraint}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </S.AssignmentTable>
                <S.Button onClick={()=>{handleModalOpen(quiz.assignmentId, child.questionId, child.description)}}>제출</S.Button>
              </S.AssignmentTableWrapper>
              </Fragment>)
            }) : ''}
            </S.Padding>
          </WhiteBackground>
        </S.AssignmentWrapper>
        <Modal open={isOpen} handleOnModalClose={handleModalClose}>
          <h2>과제 제출</h2>
          <div>
            {questionDescriptionDialog}
          </div>
          <br/>
          <div>
          <TextField placeholder="정답을 입력하세요" value={answer} onChange={(e)=>{setAnswer(e.target.value)}} />
          </div>
          <S.Button onClick={handleAnswer}>제출</S.Button>
        </Modal>
        </Fragment>)
      })
    }
    <br/><br/>
  </S.Container>
  </Fragment>
  )
}

export default CourseAssignment
