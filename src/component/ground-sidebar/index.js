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

  const isAdmin = nMe.role=='??????' ? true : false;

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
                "title": "???????????? ????????????",
                "description": "???????????? ??????????????? ?????? ?????? ????????? ???????????????",
                "startedAt": "2021-11-09T12:00:00",
                "endedAt": "2021-11-12T12:00:00"
            },
            "questions": [
                {
                    "questionId": 1,
                    "question": "Floating IP ????",
                    "description": "Cloud Computing ????????? Floating IP??? ?????? ????????? ????????????. Floating IP ??? ????????? ???????????????",
                    "score": 100
                },
                {
                    "questionId": 2,
                    "question": "VPC????",
                    "description": "VPC??? ????????? ???????????? ?????? ????????? ????????????",
                    "score": 50
                },
                {
                    "questionId": 3,
                    "question": "CIDR ???????",
                    "description": "???????????? ??????????????? ??????????????? ???????????? CIDR ????????? ????????? ???????????????",
                    "score": 30
                }
            ]
        },
        "submittedAnswerDetail": [
            {
                "questionId": 2,
                "question": "VPC????",
                "submittedAnswer": "VPC??? Virtual Private Cloud ??? ????????????",
                "scored": null
            },
            {
                "questionId": 1,
                "question": "Floating IP ????",
                "submittedAnswer": "Floating IP ??? VPC ???????????? ?????? ????????? public IP??? ?????? ???????????? ?????????????????? Floating IP ??? ?????? ????????? ???????????? ????????? ??????",
                "scored": null
            }
        ]
    }};
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('???????????? ???????????????.');
      } else {
        FailureAlert('????????? ?????????????????????.');
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
      SuccessAlert('????????? ??????????????? ?????????????????????.')
    } catch(err) {
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('???????????? ???????????????.');
      } else {
        FailureAlert('????????? ?????????????????????.');
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
            {isAdmin ? `[BoB-??????] ?????????????????? ${nMe.username}` : `[BoB-?????????] ?????????????????? ${nMe.username}`}
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleVncConnect(ip)}>
          <ListItemText primary="???????????? ??????" />
        </ListItemButton>
        <ListItemButton onClick={handleVncDisconnect}>
          <ListItemText primary="???????????? ??????" />
        </ListItemButton>

        {isAdmin && <> <ListItemButton onClick={handleStudentDetail}>
          <ListItemText primary="?????? ??????" />
          {openStudentDetail ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
          <Collapse in={openStudentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
            <List component="div" disablePadding>
              {
                nStudentList.map((student, index)=>{
                  return(
                    <Fragment>
                    <ListItemButton onClick={()=>{handleStudentContainer(index)}} sx={{ pl: 4 }}>
                      <ListItemText primary={`[?????? ${index+1}] ${student.studentName}`} />

                      {studentContainer2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={studentContainer2} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                      <List component="div" disablePadding>
                        <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                          <ListItemButton >
                            <ListItemText primary="???????????? ??????" />
                          </ListItemButton>
                          <S.ButtonWrapper>
                            <S.Button onClick={() => handleVncConnect(student.containerIp)}>??????</S.Button>
                            <S.Button onClick={handleVncDisconnect}>??????</S.Button>
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
          <ListItemText primary="?????? ??? ????????? ??????" />
          {openAssignment ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAssignment} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            {
              nQuizList.map((assignment, index)=>{
                return (
                  <Fragment>
                  <ListItemButton onClick={()=>{quizChildrenChecker[index] ? handleQuizChildrenClose(assignment.assignmentId, index) : handleQuizChildrenOpen(assignment.assignmentId, index)}} sx={{ pl: 4 }}>
                    <ListItemText primary={`[?????? ${index+1} - ?????????] ${assignment.title}`} />
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
                                <S.Button onClick={()=>{handleAnswer(assignment.assignmentId, index, child.questionId, childIndex)}}>????????????</S.Button>
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
          <ListItemText primary="?????????" />
          {openSnapshot ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSnapshot} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              {snapshot.length === 0 ? !isAdmin ? <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <ListItemButton onClick={handleAssignmentDetailClick} sx={{ display: "flex" }}>
                  <ListItemText primary="server.js ??????" />
                  {openAssignmentDetail ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAssignmentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                  <List component="div" disablePadding>
                    <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                      <S.ButtonWrapper>
                        <S.Button>????????????</S.Button>
                      </S.ButtonWrapper>
                    </ListItem>
                  </List>
                </Collapse>
              </div> : <ListItemText primary="???????????? ???????????? ????????????" /> : (
                  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <ListItemButton onClick={handleAssignmentDetailClick} sx={{ display: "flex" }}>
                      <ListItemText primary="server.js ??????" />
                      {openAssignmentDetail ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openAssignmentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                      <List component="div" disablePadding>
                        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                          <S.ButtonWrapper>
                            <S.Button>????????????</S.Button>
                          </S.ButtonWrapper>
                        </ListItem>
                      </List>
                    </Collapse>
                  </div>)}
            </ListItemButton>
            {isAdmin && <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
              <div>
                <h2>????????? ????????????</h2>
                <S.HelpText>????????? ???????????? ???????????? ???????????????.</S.HelpText>
                <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" />
              </div>
              <S.ButtonWrapper>
                <S.Button onClick={handleAddClick}>{loading ? <CircularProgress sx={{ color: "white" }} /> : "????????????"}</S.Button>
              </S.ButtonWrapper>
            </ListItem>}
          </List>
        </Collapse>
      </List>
      <Modal open={modal} handleOnModalClose={handleModalClose}>
        <h3>????????? ?????? ??????</h3>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          ???????????? ????????????????????? !
        </div>
      </Modal>
    </S.Container >
  )
}

export default GroundSidebar
