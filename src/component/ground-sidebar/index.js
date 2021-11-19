import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';

import * as S from "./styles";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import TextField from "@mui/material/TextField";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import SuccessAlert from '../SuccessAlert';
import FailureAlert from '../FailureAlert';

import Modal from "../../component/modal";


const GroundSidebar = ({ handleVncConnect, handleVncDisconnect, nMe, nStudentList, nClassDetail, nQuizList }) => {
  const router = useRouter();
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openAssignmentDetail, setOpenAssignmentDetail] = useState(false);
  const [openSnapshot, setOpenSnapshot] = useState(false);
  const [openStudentDetail, setOpenStudentDetail] = useState(false);
  const [studentDialogChecker, setStudentDialogChecker] = useState(Array.from({length: nStudentList.length}, ()=>false));
  const [quizChildrenList, setQuizChildrenList] = useState(Array.from({length: nQuizList.length}, ()=>{}));
  const [quizChildrenChecker, setQuizChildrenChecker] = useState(Array.from({length: nQuizList.length}, ()=>false));
  const userId = nMe?.id;
  const courseId = router.query.id;
  const [assignmentId, setAssignmentId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [questionDescriptionDialog, setQuestionDescriptionDialog] = useState('');
  const [answer, setAnswer] = useState(Array.from({length: nQuizList.length}, ()=>[]));

  const isAdmin = nMe.role=='강사' ? true : false;

  const changeAnswer = (value, aindex, qindex) => {
    const copyAnswer = answer.slice();
    copyAnswer[aindex][qindex] = value;
    setAnswer(copyAnswer); 
  }

  const handleQuizChildrenClose = (assignmentId, index) => {
    const copyChecker = quizChildrenChecker.slice();
    copyChecker[index] = false;
    setQuizChildrenChecker(copyChecker);
  };

  const handleQuizChildrenOpen = async (assignmentId, index) => {
    const copyAnswer = answer.slice();
    copyAnswer[index] = Array.from({length: 20}, ()=>'');
    setAnswer(copyAnswer);
    const copyChecker = quizChildrenChecker.slice();
    copyChecker[index] = true;
    setQuizChildrenChecker(copyChecker);
    let nQuizChildrenList = {}
    try {
      nQuizChildrenList = await axios.get(`/v1/courses/assignments/${assignmentId}/users/${nMe.id}`);
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

  const handleAnswer = async (aid, aindex, qid, qindex) => {
    try {
      await axios.post(`/v1/users/${userId}/courses/${courseId}/assignments/${aid}/questions/${qid}/answers`, {
        'answer' : answer[aindex][qindex]
      })
      SuccessAlert('과제가 성공적으로 제출되었습니다.')
    } catch(err) {
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('로그인이 필요합니다.');
      } else {
        FailureAlert('에러가 발생하였습니다.');
      }
    }
  }

  const handleStudentDetail = () => {
    setOpenStudentDetail(!openStudentDetail);
  }

  const handleStudentContainer = (index) => {
    const copyChecker = studentDialogChecker.slice();
    copyChecker[index] = !studentDialogChecker[index];
    setStudentDialogChecker(copyChecker);
  }

  const handleAssignmentClick = () => {
    setOpenAssignment(!openAssignment);
  };

  const handleAssignmentDetailClick = () => {
    setOpenAssignmentDetail(!openAssignmentDetail);
  };

  const handleSnapshotClick = () => {
    setOpenSnapshot(!openSnapshot);
  };

  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(false);
  }

  const [snapshot, setSnapshot] = useState([]);

  const [loading, setLoading] = useState(false);

  const addSnapshot = () => {
    setSnapshot([...snapshot, {}]);
    setLoading(false);
    setModal(true);
  }

  const handleAddClick = () => {
    setLoading(true);
    setTimeout(addSnapshot, 2000);

  }

  const ip = isAdmin ? "http://localhost:5901" : "http://localhost:5901";
  console.log(ip);

  return (
    <S.Container>
      <List
        sx={{ width: '100%', color: "#9E9E9E" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ background: "#2E3336", color: "#9e9e9e", fontSize: "1.2rem", margin: "15px" }}>
            {isAdmin ? `[BoB-강사] 보안제품개발 ${nMe.username}` : `[BoB-교육생] 보안제품개발 ${nMe.username}`}
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleVncConnect(ip)}>
          <ListItemText primary="컨테이너 접속" />
        </ListItemButton>
        <ListItemButton onClick={handleVncDisconnect}>
          <ListItemText primary="컨테이너 중지" />
        </ListItemButton>

        {isAdmin && <> <ListItemButton onClick={handleStudentDetail}>
          <ListItemText primary="학생 관리" />
          {openStudentDetail ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
          <Collapse in={openStudentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
            <List component="div" disablePadding>
              {
                nStudentList.map((student, index)=>{
                  return(
                    <Fragment>
                    <ListItemButton onClick={()=>{handleStudentContainer(index)}} sx={{ pl: 4 }}>
                      <ListItemText primary={`[학생 ${index+1}] ${student.studentName}`} />

                      {studentContainer2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={studentContainer2} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                      <List component="div" disablePadding>
                        <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                          <ListItemButton >
                            <ListItemText primary="컨테이너 관리" />
                          </ListItemButton>
                          <S.ButtonWrapper>
                            <S.Button onClick={() => handleVncConnect(student.containerIp)}>접속</S.Button>
                            <S.Button onClick={handleVncDisconnect}>중지</S.Button>
                          </S.ButtonWrapper>
                        </ListItem>
                      </List>
                    </Collapse>
                    </Fragment>
                  )
                })
              }
            </List>
          </Collapse></>}

        <ListItemButton onClick={handleAssignmentClick}>
          <ListItemText primary="과제 및 실시간 퀴즈" />
          {openAssignment ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAssignment} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            {
              nQuizList.map((assignment, index)=>{
                return (
                  <Fragment>
                  <ListItemButton onClick={()=>{quizChildrenChecker[index] ? handleQuizChildrenClose(assignment.assignmentId, index) : handleQuizChildrenOpen(assignment.assignmentId, index)}} sx={{ pl: 4 }}>
                    <ListItemText primary={`[과제 ${index+1} - 주관식] ${assignment.title}`} />
                    {quizChildrenChecker[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={quizChildrenChecker[index]} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={assignment.description} />
                      </ListItemButton>
                      {
                        quizChildrenChecker[index] ? quizChildrenList[index].questionDetail.questions.map((child, childIndex)=>{
                          return (
                            <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                              <div>
                                <S.HelpText>{child.description}</S.HelpText>
                                <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" value={answer[index][childIndex]} onChange={(e)=>{changeAnswer(e.target.value, index, childIndex)}} />
                              </div>
                              <S.ButtonWrapper>
                                <S.Button onClick={()=>{handleAnswer(assignment.assignmentId, index, child.questionId, childIndex)}}>제출하기</S.Button>
                              </S.ButtonWrapper>
                            </ListItem>
                          )
                        }) : ''
                      }
                    </List>
                  </Collapse>
                  </Fragment>
                )
              })
            }
          </List>
        </Collapse>

        <ListItemButton onClick={handleSnapshotClick}>
          <ListItemText primary="스냅샷" />
          {openSnapshot ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSnapshot} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              {snapshot.length === 0 ? !isAdmin ? <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <ListItemButton onClick={handleAssignmentDetailClick} sx={{ display: "flex" }}>
                  <ListItemText primary="server.js 생성" />
                  {openAssignmentDetail ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAssignmentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                  <List component="div" disablePadding>
                    <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                      <S.ButtonWrapper>
                        <S.Button>적용하기</S.Button>
                      </S.ButtonWrapper>
                    </ListItem>
                  </List>
                </Collapse>
              </div> : <ListItemText primary="스냅샷이 존재하지 않습니다" /> : (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <ListItemButton onClick={handleAssignmentDetailClick} sx={{ display: "flex" }}>
                      <ListItemText primary="server.js 생성" />
                      {openAssignmentDetail ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openAssignmentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                      <List component="div" disablePadding>
                        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                          <S.ButtonWrapper>
                            <S.Button>적용하기</S.Button>
                          </S.ButtonWrapper>
                        </ListItem>
                      </List>
                    </Collapse>
                  </div>)}
            </ListItemButton>
            {isAdmin && <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
              <div>
                <h2>스냅샷 생성하기</h2>
                <S.HelpText>현재를 기준으로 스냅샷이 생성됩니다.</S.HelpText>
                <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" />
              </div>
              <S.ButtonWrapper>
                <S.Button onClick={handleAddClick}>{loading ? <CircularProgress sx={{ color: "white" }} /> : "생성하기"}</S.Button>
              </S.ButtonWrapper>
            </ListItem>}
          </List>
        </Collapse>
      </List>
      <Modal open={modal} handleOnModalClose={handleModalClose}>
        <h3>스냅샷 생성 완료</h3>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          스냅샷이 생성되었습니다 !
        </div>
      </Modal>
    </S.Container >
  )
}

export default GroundSidebar
