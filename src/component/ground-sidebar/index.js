import { useState } from 'react'

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

import Modal from "../../component/modal";


const GroundSidebar = ({ isAdmin, handleVncConnect, handleVncDisconnect }) => {

  const [openAssignment, setOpenAssignment] = useState(false);
  const [openAssignmentDetail, setOpenAssignmentDetail] = useState(false);
  const [openSnapshot, setOpenSnapshot] = useState(false);
  const [openStudentDetail, setOpenStudentDetail] = useState(false);
  const [studentContainer, setStudentContainer] = useState(false);
  const [studentContainer2, setStudentContainer2] = useState(false);
  const [studentContainer3, setStudentContainer3] = useState(false);
  const [studentContainer4, setStudentContainer4] = useState(false);

  const handleStudentDetail = () => {
    setOpenStudentDetail(!openStudentDetail);
  }

  const handleStudentContainer = () => {
    setStudentContainer(!studentContainer);
  }

  const handleStudentContainer2 = () => {
    setStudentContainer2(!studentContainer2);
  }

  const handleStudentContainer3 = () => {
    setStudentContainer3(!studentContainer3);
  }

  const handleStudentContainer4 = () => {
    setStudentContainer4(!studentContainer4);
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
            {isAdmin ? "[BoB-강사] 보안제품개발 김경태" : "[BoB-교육생] 보안제품개발 강지민"}
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
              <ListItemButton onClick={handleStudentContainer} sx={{ pl: 4 }}>
                <ListItemText primary="[학생 1] 강지민" />

                {studentContainer ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={studentContainer} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                    <ListItemButton >
                      <ListItemText primary="컨테이너 관리" />
                    </ListItemButton>
                    <S.ButtonWrapper>
                      <S.Button onClick={() => handleVncConnect("http://localhost:5901")}>접속</S.Button>
                      <S.Button onClick={handleVncDisconnect}>중지</S.Button>
                    </S.ButtonWrapper>
                  </ListItem>
                </List>
              </Collapse>

              <ListItemButton onClick={handleStudentContainer2} sx={{ pl: 4 }}>
                <ListItemText primary="[학생 2] 고현수" />

                {studentContainer2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={studentContainer2} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                    <ListItemButton >
                      <ListItemText primary="컨테이너 관리" />
                    </ListItemButton>
                    <S.ButtonWrapper>
                      <S.Button onClick={() => handleVncConnect("http://localhost:5901")}>접속</S.Button>
                      <S.Button onClick={handleVncDisconnect}>중지</S.Button>
                    </S.ButtonWrapper>
                  </ListItem>
                </List>
              </Collapse>

              <ListItemButton onClick={handleStudentContainer3} sx={{ pl: 4 }}>
                <ListItemText primary="[학생 3] 임창현" />

                {studentContainer3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={studentContainer3} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                    <ListItemButton >
                      <ListItemText primary="컨테이너 관리" />
                    </ListItemButton>
                    <S.ButtonWrapper>
                      <S.Button onClick={() => handleVncConnect("http://localhost:5901")}>접속</S.Button>
                      <S.Button onClick={handleVncDisconnect}>중지</S.Button>
                    </S.ButtonWrapper>
                  </ListItem>
                </List>
              </Collapse>

              <ListItemButton onClick={handleStudentContainer4} sx={{ pl: 4 }}>
                <ListItemText primary="[학생 4] 장원익" />

                {studentContainer4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={studentContainer4} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                    <ListItemButton >
                      <ListItemText primary="컨테이너 관리" />
                    </ListItemButton>
                    <S.ButtonWrapper>
                      <S.Button onClick={() => handleVncConnect("http://localhost:5901")}>접속</S.Button>
                      <S.Button onClick={handleVncDisconnect}>중지</S.Button>
                    </S.ButtonWrapper>
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse></>}

        <ListItemButton onClick={handleAssignmentClick}>
          <ListItemText primary="과제 및 실시간 퀴즈" />
          {openAssignment ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAssignment} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            <ListItemButton onClick={handleAssignmentDetailClick} sx={{ pl: 4 }}>
              <ListItemText primary="[과제 1 - 주관식] 공격자의 정보 파악하기" />
              {openAssignmentDetail ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openAssignmentDetail} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="문제 설명" />
                </ListItemButton>
                <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                  <div>
                    <S.HelpText>Wireshark로 공격 패킷 분석하고 Source IP 와 Destination IP 를 구분하는 소스코드를 업로드해주세요. makefile 을 이용해서 build를 해야하고 헤더 파일과 소스 파일 그리고 main 함수를 나눠서 제출하세요 궁금한 사항이 있으면 vground123@gmail.com 으로 메일 보내주시되 소스 코드를 캡쳐하지 마시고 실행 가능한 형태의 파일 .c 형태로 보내주세요</S.HelpText>
                    <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" />
                  </div>
                  <S.ButtonWrapper>
                    <S.Button>제출하기</S.Button>
                  </S.ButtonWrapper>
                </ListItem>
              </List>
            </Collapse>
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
