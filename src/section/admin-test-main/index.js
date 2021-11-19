import { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import * as  S from "./styles";
import { data } from "./data";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from "@mui/material/Chip";
import CircularProgress from '@mui/material/CircularProgress';
import TestHeader from "../../component/test-header";
import WhiteBackground from "../../component/white-background";
import Modal from "../../component/modal";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from 'axios';

import FailureAlert from '../../component/FailureAlert';
import SuccessAlert from '../../component/SuccessAlert';


const convertToChip = (string) => {
  if (string === "마감") return <Chip label={string} />
  else if (string === "진행중" || string === "교육생") return <Chip color="success" label={string} />
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CourseMain ({nMe, nEvaluationDetail, nStudentList, nQuizList}) {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [invitation, setInvitation] = useState("")
  const [invitationModal, setInvitationModal] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState(false);
  const [containerStatus, setContainerStatus] = useState('중지');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizOpen, setQuizOpen] = useState(Date.now());
  const [quizClose, setQuizClose] = useState(Date.now());
  const [quizChildrenList, setQuizChildrenList] = useState([{
    'question': '퀴즈제목',
    'description': '',
    'answer': '',
    'score': 0
  }]);

  const handleQuiz = async () => {
    try {
      const nResult = await axios.post(`/v1/courses/${router.query.id}/assignments`, {
        'title' : quizTitle,
        'description' : quizDescription,
        'startedAt' : quizOpen,
        'endedAt' : quizClose
      });
      await axios.post(`/v1/courses/${router.query.id}/assignments/${nResult.data.assignmentId}`, quizChildrenList);
      //SuccessAlert('과제가 성공적으로 추가되었습니다.');
      router.reload();
    } catch(err) {
      console.log('error :', err)
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('로그인이 필요합니다.');
      } else {
        FailureAlert('에러가 발생하였습니다.');
      }
    }
    setAssignmentModal(false);
  }

  const handleQuizChildrenDescription = (data, index) => {
    const copyList = quizChildrenList.slice();
    copyList[index] = {
      'question': quizChildrenList[index].question,
      'description': data,
      'answer': quizChildrenList[index].answer,
      'score': quizChildrenList[index].score
    }
    setQuizChildrenList(copyList);
  } 

  const handleQuizChildrenAnswer = (data, index) => {
    const copyList = quizChildrenList.slice();
    copyList[index] = {
      'question': quizChildrenList[index].question,
      'description': quizChildrenList[index].description,
      'answer': data,
      'score': quizChildrenList[index].score
    }
    setQuizChildrenList(copyList);
  } 

  const handleQuizChildrenScore = (data, index) => {
    const copyList = quizChildrenList.slice();
    copyList[index] = {
      'question': quizChildrenList[index].question,
      'description': quizChildrenList[index].description,
      'answer': quizChildrenList[index].answer,
      'score': parseInt(data)
    }
    setQuizChildrenList(copyList);
  } 

  const addQuizChildren = () => {
    const copyList = quizChildrenList.slice();
    copyList.push({
      'question': '퀴즈제목',
      'description': '',
      'answer': '',
      'score': 0
    });
    setQuizChildrenList(copyList);
  }

  const deleteQuizChildren = (index) => {
    const copyList = quizChildrenList.slice();
    copyList.splice(index, 1);
    setQuizChildrenList(copyList);
  }

  const handleCreateAssignment = () => {
    setAssignmentModal(true);
  }

  const handleInvitationOpen = () => {
    setInvitationModal(true);
  }

  const handleModalClose = () => {
    setInvitationModal(false);
    setAssignmentModal(false);
  }

  const [loading, setLoading] = useState(false);
  const [invitationLoading, setInvitationLoading] = useState(false);

  const loadingFalse = () => {
    setAssignmentModal(false);
    setAssignments(
      [...assignments, { id: 1, title: "공격자 IP 구분하기", status: "진행중", startedAt: "2021-01-01", endedAt: "2021-01-02" }]
    )
    setLoading(false);
  }

  const invitationLoadingFalse = () => {
    setInvitation("http://localhost:3000/course/dxx9WbedRiRyl1FZHbPejwdE82Asd");
    setInvitationLoading(false);
  }

  const handleLoading = () => {
    setLoading(true);
    setTimeout(loadingFalse, 2000);
  }

  const handleInvitationLoading = () => {
    setInvitationLoading(true);
    setTimeout(invitationLoadingFalse, 2000);
  }

  const { courseInfo, students: { signedUp, register } } = data;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <S.Container>
        <S.CourseHeaderWrapper>
          <TestHeader
            isAdmin
            title={nEvaluationDetail.title}
            instructor={nEvaluationDetail.teacherName}
            thumnailImageUrl={nEvaluationDetail.thumnailImageUrl}
            containerStatus={containerStatus}
            setContainerStatus={setContainerStatus} />
        </S.CourseHeaderWrapper>
        <S.AssignmentWrapper>
          <Box sx={{ width: '100%' }} style={{ margin: "80px 0" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="문제" {...a11yProps(0)} />
                {/*<Tab label="응시자 관리" {...a11yProps(1)} />*/}
                {/*<Tab label="클래스 관리" {...a11yProps(2)} />*/}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div style={{ marginTop: "-100px" }}>
                <WhiteBackground>
                  <S.AdminHeader>
                    <h3>문제</h3>
                    <S.Text onClick={handleCreateAssignment}>{/*생성하기*/}</S.Text>
                  </S.AdminHeader>``
                  <Divider />
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell align="left">문제 이름</TableCell>
                        <TableCell align="right">설명</TableCell>
                        <TableCell align="right">배점</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nQuizList.length === 0 ? <div style={{ width: "100%", textAlign: "center" }}><h4>과제가 존재하지 않습니다.</h4></div> : nQuizList.map((assignment) => (
                        <TableRow
                          key={assignment.quizId}
                          hover
                          style={{ cursor: "pointer" }}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {assignment.quizId}
                          </TableCell>
                          <TableCell align="left">{assignment.question}</TableCell>
                          <TableCell align="right">{assignment.description}</TableCell>
                          <TableCell align="right">{assignment.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </WhiteBackground>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div style={{ marginTop: "-100px" }}>
                <WhiteBackground>
                  <S.AdminHeader>
                    <h3>
                      구성원 관리
                    </h3>
                    <S.Text style={{ cursor: "pointer" }} onClick={handleInvitationOpen}>
                      초대 링크
                      </S.Text>
                  </S.AdminHeader>
                  <Divider />
                  <S.AdminCourseTitle>수강 중인 학생</S.AdminCourseTitle>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">접속 IP</TableCell>
                        <TableCell align="right">구분</TableCell>
                        <TableCell align="right">삭제</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nStudentList.length === 0 ? <div style={{ width: "100%", textAlign: "center" }}><h4>현재 수강중인 학생이 존재하지 않습니다.</h4></div> : nStudentList.map((student) => (
                        <TableRow
                          onClick={()=>{router.push(`/ground/${router.query.id}`)}}
                          key={student.studentId}
                          hover
                          style={{ cursor: "pointer" }}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {student.studentName}
                          </TableCell>
                          <TableCell align="left">{student.containerIp}</TableCell>
                          <TableCell align="right">{convertToChip(student?.role ? student?.role : '교육생')}</TableCell>
                          <TableCell hover align="right"><ClearIcon /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <br />
                  <S.AdminCourseTitle>수강을 신청한 학생</S.AdminCourseTitle>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">이메일</TableCell>
                        <TableCell align="right">구분</TableCell>
                        <TableCell align="right">추가</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {register.length === 0 ? <div style={{ width: "100%", textAlign: "center" }}><h4>수강을 신청한 학생이 존재하지 않습니다.</h4></div> : register.map((student) => (
                        <TableRow
                          key={student.id}
                          hover
                          style={{ cursor: "pointer" }}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {student.name}
                          </TableCell>
                          <TableCell align="left">{student.email}</TableCell>
                          <TableCell align="right">{convertToChip(student?.role ? student?.role : '교육생')}</TableCell>
                          <TableCell align="right"><ControlPointIcon /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </WhiteBackground>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
      </TabPanel>
          </Box>
        </S.AssignmentWrapper>
      </S.Container>
      <Modal open={assignmentModal} handleOnModalClose={handleModalClose}>
        <S.CreateAssignmentWrapper>
          <h3>과제 생성하기</h3>
          <S.InputColumn>
            <h3>과제명</h3>
            {/*<S.HelpText>해당 클래스에 타이틀로 사용될 이름입니다.</S.HelpText>*/}
            <TextField label="과제명" variant="outlined" value={quizTitle} onChange={(e)=>{setQuizTitle(e.target.value)}} />
          </S.InputColumn>

          <S.InputColumn style={{ width: "80%" }}>
            <h3>과제 상세 설명</h3>
            <TextField fullWidth label="과제 설명" variant="outlined" value={quizDescription} onChange={(e)=>{setQuizDescription(e.target.value)}} multiline rows={2} />
          </S.InputColumn>

          <S.InputColumn>
            <h3>공개 및 마감 시간</h3>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="공개시간"
                value={quizOpen}
                onChange={(e)=>{setQuizOpen(new Date(e))}}
                renderInput={(params) => <TextField style={{ paddingRight: "30px" }} {...params} />}
              />
              <DateTimePicker
                label="마감시간"
                value={quizClose}
                onChange={(e)=>{setQuizClose(new Date(e))}}
                renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
            </div>
          </S.InputColumn>

          <S.InputColumn style={{ width: "80%" }}>
            <h3>주관식 문제</h3>
            <S.HelpText>주관식 문제에 대한 설명과 배점을 입력하세요</S.HelpText>
            {
              quizChildrenList.map((item, index)=>{
                return (
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "5px" }}>
                <TextField sx={{ width: "50%", marginRight: "20px" }} fullWidth label="문제" variant="outlined" value={item.description} onChange={(e)=>{handleQuizChildrenDescription(e.target.value, index)}} />
                <TextField sx={{ width: "30%", marginRight: "20px" }} fullWidth label="정답" variant="outlined" value={item.answer} onChange={(e)=>{handleQuizChildrenAnswer(e.target.value, index)}} />
                <TextField sx={{ width: "20%", marginRight: "20px" }} fullWidth label="배점" variant="outlined" value={item.score} onChange={(e)=>{handleQuizChildrenScore(e.target.value, index)}} />
                {quizChildrenList.length == index+1 ? <AddCircleOutlineIcon onClick={addQuizChildren} sx={{ color: "green" }} /> : <RemoveCircleOutlineIcon onClick={()=>{deleteQuizChildren(index)}} sx={{ color: "red" }} />}
                </div>
                )
              })
            }
          </S.InputColumn>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <S.Button onClick={handleQuiz}>
              {loading ? <CircularProgress style={{ color: "white" }} /> : "생성하기"}
            </S.Button>
          </div>
        </S.CreateAssignmentWrapper>
      </Modal>
      <Modal open={invitationModal} handleOnModalClose={handleModalClose}>
        <h3>초대 링크 생성하기</h3>
        초대 링크 : {invitation}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <S.Button onClick={handleInvitationLoading}>
            {invitationLoading ? <CircularProgress style={{ color: "white" }} /> : "생성하기"}
          </S.Button>
        </div>
      </Modal>
    </>
  )
}