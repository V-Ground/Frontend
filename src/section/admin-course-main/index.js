import { useState } from 'react'
import Link from "next/link";
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
import CourseHeader from "../../component/course-header";
import WhiteBackground from "../../component/white-background";
import Modal from "../../component/modal";


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

const CourseMain = () => {

  const [assignments, setAssignments] = useState([]);
  const [invitation, setInvitation] = useState("")
  const [invitationModal, setInvitationModal] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState(false);

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
          <CourseHeader
            isAdmin
            title={courseInfo.title}
            instructor={courseInfo.instructor}
            thumnailImageUrl={courseInfo.thumnailImageUrl}
            containerStatus={courseInfo.containerStatus} />
        </S.CourseHeaderWrapper>
        <S.AssignmentWrapper>
          <Box sx={{ width: '100%' }} style={{ margin: "80px 0" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="과제" {...a11yProps(0)} />
                <Tab label="구성원 관리" {...a11yProps(1)} />
                <Tab label="클래스 관리" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div style={{ marginTop: "-170px" }}>
                <WhiteBackground>
                  <S.AdminHeader>
                    <h3>과제</h3>
                    <S.Text onClick={handleCreateAssignment}>생성하기</S.Text>
                  </S.AdminHeader>
                  <Divider />
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell align="left">과제 이름</TableCell>
                        <TableCell align="right">상태</TableCell>
                        <TableCell align="right">마감</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assignments.length === 0 ? <div style={{ width: "100%", textAlign: "center" }}><h4>과제가 존재하지 않습니다.</h4></div> : assignments.map((assignment) => (
                        <TableRow
                          key={assignment.id}
                          hover
                          style={{ cursor: "pointer" }}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {assignment.id}
                          </TableCell>
                          <TableCell align="left">{assignment.title}</TableCell>
                          <TableCell align="right">{convertToChip(assignment.status)}</TableCell>
                          <TableCell align="right">{assignment.startedAt} ~ {assignment.endedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </WhiteBackground>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div style={{ marginTop: "-170px" }}>
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
                  <h3>수강중인 학생</h3>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">이메일</TableCell>
                        <TableCell align="right">구분</TableCell>
                        <TableCell align="right">삭제</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {signedUp.length === 0 ? <div style={{ width: "100%", textAlign: "center" }}><h4>현재 수강중인 학생이 존재하지 않습니다.</h4></div> : signedUp.map((student) => (
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
                          <TableCell align="right">{convertToChip(student.role)}</TableCell>
                          <TableCell hover align="right"><ClearIcon /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <br />
                  <h3>수강을 신청한 학생</h3>
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
                          <TableCell align="right">{convertToChip(student.role)}</TableCell>
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
            <S.HelpText>해당 클래스에 타이틀로 사용될 이름입니다.</S.HelpText>
            <TextField label="과제명" variant="outlined" />
          </S.InputColumn>

          <S.InputColumn style={{ width: "80%" }}>
            <h3>과제 상세 설명</h3>
            <S.HelpText>과제에 대한 상세한 설명입니다.</S.HelpText>
            <TextField fullWidth label="과제 설명" variant="outlined" multiline rows={5} />
          </S.InputColumn>

          <S.InputColumn>
            <h3>공개 및 마감 시간</h3>
            <S.HelpText>해당 클래스에 타이틀로 사용될 이름입니다.</S.HelpText>
            <div>
              <TextField style={{ marginRight: "30px" }} label="공개 시간" variant="outlined" />
              <TextField label="마감 시간" variant="outlined" />
            </div>
          </S.InputColumn>

          <S.InputColumn style={{ width: "80%" }}>
            <h3>주관식 문제</h3>
            <S.HelpText>주관식 문제에 대한 설명과 배점을 입력하세요</S.HelpText>
            <TextField fullWidth label="문제" variant="outlined" />
          </S.InputColumn>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <S.Button onClick={handleLoading}>
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

export default CourseMain