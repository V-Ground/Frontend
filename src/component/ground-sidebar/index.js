import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';

import * as S from "./styles";
import styles from './style.module.css'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import TextField from "@mui/material/TextField";
import { CircularProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ComputerIcon from '@mui/icons-material/Computer';
import MouseIcon from '@mui/icons-material/Mouse';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SensorsIcon from '@mui/icons-material/Sensors';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CachedIcon from '@mui/icons-material/Cached';
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import SuccessAlert from '../SuccessAlert';
import FailureAlert from '../FailureAlert';

import Modal from "../../component/modal";

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
}

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const union = (a, b) => {
  return [...a, ...not(b, a)];
}

const bashHistoryDummyResult = Array.from({length: 10}, ()=>{return {
  "studentId": 1,
  "history": "2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n"
}}).concat([{
  "studentId": 2,
  "history": "2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nfollow -al\n"
},{
  "studentId": 3,
  "history": "2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nfollow -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nls -al\n2021-12-10T14:33:12\nls\n2021-12-10T14:33:12\nfollow -al\n"
}]);

const installedProgramDummyResult = Array.from({length: 40}, ()=>{return {
  "studentId": 1,
  "status": true,
  "installed": "/home/user",
  "version": "2.2.1"
}}).concat(Array.from({length: 40}, ()=>{return {
  "studentId": 1,
  "status": false,
  "installed": "",
  "version": ""
}}));

const fileSearchDummyResult = Array.from({length: 40}, ()=>{return {
  "studentId": 1,
  "isFile": 1,
  "fileContent": "hello world\nhello world\nhello world\n"
}}).concat(Array.from({length: 40}, ()=>{return {
  "studentId": 2,
  "isFile": 0,
  "fileContent": "best of the best\nbest of the best\nbest of the best\nbest of the best\nbest of the best\n"
}}));

const networkPacketDummyResult = Array.from({length: 40}, ()=>{return { 
  "studentId": 1,
  "packet": [{
  "time": "2021-12-10T14:33:12",
  "src" : {
    "mac": "11-11-11-11-11-11",
    "ip" : "111.111.111.111",
    "port": "5900"
  },
  "dst" : {
    "dns": "https://www.naver.com",
    "mac": "22-22-22-22-22-22",
    "ip" : "222.222.222.222",
    "port": "5900"
  },
  "protocol": "TCP",
  "length": 24,
  }]
}}).concat(Array.from({length: 40}, ()=>{return { 
  "studentId": 1,
  "packet": [{
  "time": "2021-12-10T14:33:12",
  "src" : {
    "mac": "33-33-33-33-33-33",
    "ip" : "333.333.333.333",
    "port": "5900"
  },
  "dst" : {
    "dns": "https://www.naver.com",
    "mac": "44-44-44-44-44-44",
    "ip" : "444.444.444.444",
    "port": "5900"
  },
  "protocol": "TCP",
  "length": 36,
  }]
}}));

const GroundSidebar = ({ handleVncConnect, handleVncDisconnect, nMe, nStudentList, nClassDetail, nQuizList }) => {
  const router = useRouter();
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openAssignmentDetail, setOpenAssignmentDetail] = useState(false);
  const [openSnapshot, setOpenSnapshot] = useState(false);
  const [openStudentDetail, setOpenStudentDetail] = useState(false);
  const [studentDialogChecker, setStudentDialogChecker] = useState(Array.from({length: nStudentList.length}, ()=>false));
  const [quizChildrenList, setQuizChildrenList] = useState(Array.from({length: nQuizList.length}, ()=>{return {}}));
  const [quizChildrenChecker, setQuizChildrenChecker] = useState(Array.from({length: nQuizList.length}, ()=>false));
  const userId = nMe?.id;
  const courseId = router.query.id;
  const [assignmentId, setAssignmentId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [questionDescriptionDialog, setQuestionDescriptionDialog] = useState('');
  const [answer, setAnswer] = useState(Array.from({length: nQuizList.length}, ()=>[]));
  const [monitoringModalOpen, setMonitoringModalOpen] = useState(false);
  const [monitoringCategory, setMonitoringCategory] = useState('BASH 기록');

  const [bashHistoryLive, setBashHistoryLive] = useState(true);
  const [bashHistoryStartYear, setBashHistoryStartYear] = useState(new Date().getFullYear());
  const [bashHistoryStartMonth, setBashHistoryStartMonth] = useState(new Date().getMonth());
  const [bashHistoryStartDate, setBashHistoryStartDate] = useState(new Date().getDate());
  const [bashHistoryStartHour, setBashHistoryStartHour] = useState(new Date().getHours());
  const [bashHistoryStartMinute, setBashHistoryStartMinute] = useState(new Date().getMinutes());
  const [bashHistoryEndYear, setBashHistoryEndYear] = useState(new Date().getFullYear());
  const [bashHistoryEndMonth, setBashHistoryEndMonth] = useState(new Date().getMonth());
  const [bashHistoryEndDate, setBashHistoryEndDate] = useState(new Date().getDate());
  const [bashHistoryEndHour, setBashHistoryEndHour] = useState(new Date().getHours());
  const [bashHistoryEndMinute, setBashHistoryEndMinute] = useState(new Date().getMinutes());
  const [noneBashHistoryStudentList, setNoneBashHistoryStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [bashHistoryStudentList, setBashHistoryStudentList] = useState([]);
  const [bashHistoryStudentChecked, setBashHistoryStudentChecked] = useState([]);
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [bashHistoryResult, setBashHistoryResult] = useState(false);
  const [bashHistoryResultViewMode, setBashHistoryResultViewMode] = useState(6);
  const [bashHistoryMoreResultKeyword, setBashHistoryMoreResultKeyword] = useState('');

  const [installedProgramDialogOpen, setInstalledProgramDialogOpen] = useState(false);
  const [installedProgramResult, setInstalledProgramResult] = useState(false);
  const [installedProgramStudentChecked, setInstalledProgramStudentChecked] = useState([]);
  const [noneInstalledProgramStudentList, setNoneInstalledProgramStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [installedProgramStudentList, setInstalledProgramStudentList] = useState([]);
  const [installedProgramType, setInstalledProgramType] = useState(0);
  const [installedProgramRootDirectory, setInstalledProgramRootDirectory] = useState('');
  const [installedProgramName, setInstalledProgramName] = useState('');
  const [installedProgramSuccessStudentMoreSearch, setInstalledProgramSuccessStudentMoreSearch] = useState('');
  const [installedProgramSuccessPathMoreSearch, setInstalledProgramSuccessPathMoreSearch] = useState('');
  const [installedProgramSuccessVersionMoreSearch, setInstalledProgramSuccessVersionMoreSearch] = useState('');
  const [installedProgramFailStudentMoreSearch, setInstalledProgramFailStudentMoreSearch] = useState('');
  const [installedProgramFailPathMoreSearch, setInstalledProgramFailPathMoreSearch] = useState('');
  const [installedProgramFailVersionMoreSearch, setInstalledProgramFailVersionMoreSearch] = useState('');

  const [fileSearchDialogOpen, setFileSearchDialogOpen] = useState(false);
  const [fileSearchResult, setFileSearchResult] = useState(false);
  const [fileSearchStudentChecked, setFileSearchStudentChecked] = useState([]);
  const [noneFileSearchStudentList, setNoneFileSearchStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [fileSearchStudentList, setFileSearchStudentList] = useState([]);
  const [fileSearchDirectory, setFileSearchDirectory] = useState('');
  const [fileSearchSuccessStudentMoreSearch, setFileSearchSuccessStudentMoreSearch] = useState('');
  const [fileSearchSuccessFileMoreSearch, setFileSearchSuccessFileMoreSearch] = useState('');
  const [fileSearchFailStudentMoreSearch, setFileSearchFailStudentMoreSearch] = useState('');
  const [fileSearchResultViewMode, setFileSearchResultViewMode] = useState(6);
  const [fileSearchMoreResultKeyword, setFileSearchMoreResultKeyword] = useState('');

  const [networkPacketDialogOpen, setNetworkPacketDialogOpen] = useState(false);
  const [networkPacketResult, setNetworkPacketResult] = useState(0);
  const [networkPacketStudentChecked, setNetworkPacketStudentChecked] = useState([]);
  const [noneNetworkPacketStudentList, setNoneNetworkPacketStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [networkPacketStudentList, setNetworkPacketStudentList] = useState([]);
  const [networkPacketResultViewMode, setNetworkPacketResultViewMode] = useState(12);

  const [commandDialogOpen, setCommandDialogOpen] = useState(0);
  const [commandResult, setCommandResult] = useState(false);
  const [commandStudentChecked, setCommandStudentChecked] = useState([]);
  const [noneCommandStudentList, setNoneCommandStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [commandStudentList, setCommandStudentList] = useState([]);
  const [commandResultList, setCommandResultList] = useState([]);
  const [commandString, setCommandString] = useState('');
  const [commandType, setCommandType] = useState(0);
  const [commandMoreSearch, setCommandMoreSearch] = useState('');
  const [commandSuccessStudentMoreSearch, setCommandSuccessStudentMoreSearch] = useState('');
  const [commandSuccessResultMoreSearch, setCommandSuccessResultMoreSearch] = useState('');

  const [scriptDialogOpen, setScriptDialogOpen] = useState(0);
  const [scriptResult, setScriptResult] = useState(false);
  const [scriptStudentChecked, setScriptStudentChecked] = useState([]);
  const [noneScriptStudentList, setNoneScriptStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [scriptStudentList, setScriptStudentList] = useState([]);

  const handleScript = () => {
    setScriptResult(true);
  }

  const handleCommand = async() => {
    try {
      const result = await axios.post(
        '/v1/containers/courses/1/remote_command', {
          "studentIds": [
              { "studentId": 1 }
          ],
          "command": commandString
      }
      );
      console.log('원격명령실행 성공 : ', result.data);
      setCommandResultList(result.data);
      setCommandResult(true);
    } catch(err) {
      console.log('원격명령실행 에러 : ', err);
    }
  }

  const handleNetworkPacket = () => {
    setNetworkPacketResult(2);
  }

  const handleFileSearch = () => {
    setFileSearchResult(2);
  }

  const handleInstalledProgram = () => {
    setInstalledProgramResult(2);
  }

  const handleToggle = (value, nChecked, setnChecked) => () => {
    const currentIndex = nChecked.indexOf(value);
    const newChecked = [...nChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setnChecked(newChecked);
  };

  const numberOfChecked = (items, nChecked) => intersection(nChecked, items).length;

  const handleToggleAll = (items, nChecked, setnChecked) => () => {
    console.log('what??', items, nChecked);
    if (numberOfChecked(items, nChecked) === items.length) {
      setnChecked(not(nChecked, items));
    } else {
      setnChecked(union(nChecked, items));
    }
  };

  const handleCheckedRight = (nChecked, setnChecked, nLeft, setnLeft, nRight, setnRight) => {
    setnRight(nRight.concat(intersection(nChecked, nLeft)));
    setnLeft(not(nLeft, intersection(nChecked, nLeft)));
    setnChecked(not(nChecked, intersection(nChecked, nLeft)));
  };

  const handleCheckedLeft = (nChecked, setnChecked, nLeft, setnLeft, nRight, setnRight) => {
    setnLeft(nLeft.concat(intersection(nChecked, nRight)));
    setnRight(not(nRight, intersection(nChecked, nRight)));
    setnChecked(not(nChecked, intersection(nChecked, nRight)));
  };

  const customList = (title, items, nChecked, setnChecked) => (
    <Card className={styles.studentTransferCard}>
      <CardHeader
        className={styles.studentTransferCardHeader}
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            className={styles.studentTransferCheckbox}
            color='default'
            onClick={handleToggleAll(items, nChecked, setnChecked)}
            checked={numberOfChecked(items, nChecked) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items, nChecked) !== items.length && numberOfChecked(items, nChecked) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={`${title} ${numberOfChecked(items, nChecked)}/${items.length}`}
      />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
        className={styles.studentTransferList}
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value, nChecked, setnChecked)}
            >
              <ListItemIcon>
                <Checkbox
                  className={styles.studentTransferCheckbox}
                  color='default'
                  checked={nChecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`[교육생] ${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const isAdmin = nMe.role=='강사' ? true : false;

  const handleBashHistory = () => {
    setBashHistoryResult(true);
  }

  const handleStudentListModalOpen = () => {
    setStudentListModalOpen(true);
  }

  const handleStudentListModalClose = () => {
    setStudentListModalOpen(false);
  }

  const handleMonitoringModalOpen = () => {
    setMonitoringModalOpen(true);
  }

  const handleMonitoringModalClose = () => {
    setMonitoringModalOpen(false);
  }

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
      nQuizChildrenList = await axios.get(`/v1/courses/${router.query.id}/assignments/${assignmentId}/users/${nMe.id}`).then((result)=>{
        const copyList = quizChildrenList.slice();
        copyList[index] =  result.data;
        setQuizChildrenList(copyList);
        console.log('copyList : ', copyList);
      });
    } catch(err) {
      console.log('error : ', err);
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

  const ip = 'http://'+nClassDetail.containerIp;
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
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={``} />
                <ListItemText primary={`학생명`} />
                <ListItemText primary={``} />
                <ListItemText className={styles.studentManagementTitle} primary={`컨테이너`} />
                <ListItemText primary={`활동감지`} />
              </ListItemButton>
              {
                nStudentList.map((student, index)=>{
                  return(
                    <Fragment>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`[학생 ${index+1}] ${student.studentName}`} />
                      {student.containerStatus ? <ListItemText><Button variant="contained" color='success'> 원격접속 </Button></ListItemText> : <ListItemText><Button variant="outlined" color='error'>접속불가</Button></ListItemText>}
                      {student.activity ? <ListItemText className={styles.mouseIcon}><MouseIcon color='primary' /></ListItemText> : <ListItemText className={styles.mouseIcon}><MouseIcon color='disabled' /></ListItemText>}
                      {studentDialogChecker[index] ? <ExpandLess onClick={()=>{handleStudentContainer(index)}} /> : <ExpandMore onClick={()=>{handleStudentContainer(index)}} />}
                    </ListItemButton>
                    <Collapse in={studentDialogChecker[index]} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                      <List component="div" disablePadding>
                        <ListItem sx={{ pl: 4, display: "flex", flexDirection: "column" }}>
                          <ListItemButton >
                            <ListItemText primary="컨테이너 관리" />
                          </ListItemButton>
                          <S.ButtonWrapper>
                            <S.Button onClick={() => handleVncConnect('http://'+student.containerIp)}>접속</S.Button>
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
                        quizChildrenChecker[index] && Object.keys(quizChildrenList[index]).length ? quizChildrenList[index].questionDetail.questions.map((child, childIndex)=>{
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

        <ListItemButton onClick={handleMonitoringModalOpen}>
          <ListItemText primary="모니터링" />
          <div className={styles.addIcon} ><AddIcon /></div>
        </ListItemButton>

        {/* <ListItemButton onClick={handleSnapshotClick}>
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
        </Collapse> */}
      </List>
      {/* <Modal open={modal} handleOnModalClose={handleModalClose}>
        <h3>스냅샷 생성 완료</h3>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          스냅샷이 생성되었습니다 !
        </div>
      </Modal> */}

      <Dialog
        open={monitoringModalOpen}
        onClose={handleMonitoringModalClose}
        fullWidth={true}
        maxWidth={'xl'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={handleMonitoringModalClose} />
        <DialogContent className={styles.monitoringModalDialog}>
          <Grid container>
            <Grid item xs={2} className={styles.monitoringSidebar}>
              <Grid container justifyContent={'space-around'} direction={'column'} spacing={6}>
                {/* <Grid item xs={2} onClick={()=>{setMonitoringCategory('로그')}}><ManageSearchIcon className={styles.monitoringSidebarIcon_log}/> 로그</Grid>
                <Grid item xs={2} onClick={()=>{setMonitoringCategory('네트워크')}}><SensorsIcon className={styles.monitoringSidebarIcon_network}/> 네트워크</Grid>
                <Grid item xs={2} onClick={()=>{setMonitoringCategory('원격실행')}}><SettingsEthernetIcon className={styles.monitoringSidebarIcon_command}/> 원격실행</Grid>
                <Grid item xs={2} onClick={()=>{setMonitoringCategory('과제 및 실시간 퀴즈')}}><CreateIcon className={styles.monitoringSidebarIcon_command}/> 과제 및 실시간 퀴즈</Grid> */}
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('BASH 기록')}}><ManageSearchIcon className={styles.monitoringSidebarIcon_log}/> BASH 기록</Grid>
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('설치 프로그램')}}><ManageSearchIcon className={styles.monitoringSidebarIcon_log}/> 설치 프로그램</Grid>
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('파일 탐색')}}><ManageSearchIcon className={styles.monitoringSidebarIcon_log}/> 파일 탐색</Grid>
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('네트워크 패킷')}}><SensorsIcon className={styles.monitoringSidebarIcon_network}/> 네트워크 패킷</Grid>
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('명령어 실행')}}><SettingsEthernetIcon className={styles.monitoringSidebarIcon_command}/> 명령어 실행</Grid>
                {/* <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('스크립트 실행')}}><SettingsEthernetIcon className={styles.monitoringSidebarIcon_command}/> 스크립트 실행</Grid>
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('과제 및 실시간 퀴즈')}}><CreateIcon className={styles.monitoringSidebarIcon_command}/> 과제 및 실시간 퀴즈</Grid>
                <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('O/X 체크')}}><CreateIcon className={styles.monitoringSidebarIcon_command}/> O/X 체크</Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={10} className={styles.monitoringModalItem}>
              <Typography className={styles.monitoringCategory} variant='h5'>{
                //monitoringCategory=='로그' ? <ManageSearchIcon className={styles.monitoringItemTitle_log}/> :
                monitoringCategory=='BASH 기록' ? <ManageSearchIcon className={styles.monitoringItemTitle_log}/> :
                monitoringCategory=='설치 프로그램' ? <ManageSearchIcon className={styles.monitoringItemTitle_log}/> :
                monitoringCategory=='파일 탐색' ? <ManageSearchIcon className={styles.monitoringItemTitle_log}/> :
                //monitoringCategory=='네트워크' ? <SensorsIcon className={styles.monitoringItemTitle_network}/> :
                monitoringCategory=='네트워크 패킷' ? <SensorsIcon className={styles.monitoringItemTitle_network}/> :
                //monitoringCategory=='원격실행' ? <SettingsEthernetIcon className={styles.monitoringItemTitle_command}/> :
                monitoringCategory=='명령어 실행' ? <SettingsEthernetIcon className={styles.monitoringItemTitle_command}/> :
                monitoringCategory=='스크립트 실행' ? <SettingsEthernetIcon className={styles.monitoringItemTitle_command}/> :
                monitoringCategory=='과제 및 실시간 퀴즈' ? <CreateIcon className={styles.monitoringItemTitle_command}/> :
                monitoringCategory=='O/X 체크' ? <CreateIcon className={styles.monitoringItemTitle_command}/> :
                ''
              } {monitoringCategory}</Typography>
              {
                monitoringCategory=='BASH 기록' ?
                  bashHistoryResult ?
                  // #평가모듈 - BASH 기록 결과
                  <Fragment>
                  <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                    <Grid item xs={9} className={styles.monitoringResultHeaderSearch}>
                      결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setBashHistoryMoreResultKeyword(e.target.value)}} />
                      {` ( ${bashHistoryDummyResult.filter((item)=>item.history.replaceAll('\n','').includes(bashHistoryMoreResultKeyword)).length} 명 / ${bashHistoryDummyResult.length} 명 )`}
                    </Grid>
                    <Grid item xs={3} className={styles.monitoringResultHeaderButton}>
                      <div onClick={()=>{/*api 완성되면 새로고침함수 추가필요*/}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                      <div onClick={()=>{setBashHistoryResult(false)}}>{`검색창 돌아가기`}</div>
                      <div onClick={()=>{setBashHistoryResultViewMode(bashHistoryResultViewMode==6 ? 12 : 6)}}>{`${bashHistoryResultViewMode==6 ? '1' : '2'}개씩 보기`}</div>
                    </Grid>
                  </Grid>
                  <Grid container className={styles.monitoringResultBody} spacing={4}>
                    {
                      bashHistoryDummyResult.filter((item)=>item.history.replaceAll('\n','').includes(bashHistoryMoreResultKeyword)).map((result, index)=>{
                        return(
                        <Grid item xs={bashHistoryResultViewMode}>
                          <div container className={styles.monitoringResultItem}>
                            <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${index+1}번 학생명 필요`}</Typography></div>
                            <div className={styles.resultItemBody}>
                              {
                                result.history.split('\n').map((line, index)=>{
                                  return (
                                    line && index%2==0 ? 
                                    <div className={styles.resultLine}>{`[${new Date(line).toLocaleDateString()} ${new Date(line).toLocaleTimeString()}]`} <span className={styles.fontBolder}>{`${result.history.split('\n')[index+1]}`}</span></div>
                                    : ''
                                  )
                                })
                              }
                            </div>
                          </div>
                        </Grid>
                        )
                      })
                    }
                  </Grid>
                  </Fragment>
                  :
                  // #평가모듈 - BASH 기록
                  <Grid container className={styles.monitoringBody} spacing={4}>
                    <Grid item xs={12}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'BASH 기록'}</Typography></Grid>
                        <Grid item xs={11}>
                          <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                            {/* <Grid item xs={11}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}><Button onClick={()=>{setBashHistoryLive(true)}} className={bashHistoryLive ? styles.bashHistoryButton : styles.bashHistoryButton_disabled} variant='contained' fullWidth={true}>실시간</Button></Grid>
                                <Grid item xs={6}><Button onClick={()=>{setBashHistoryLive(false)}} className={bashHistoryLive ? styles.bashHistoryButton_disabled : styles.bashHistoryButton} variant='contained' fullWidth={true}>비실시간</Button></Grid>
                              </Grid>
                            </Grid> */}
                            <Grid item xs={11}>
                              <Grid container className={styles.bashHistoryPeriodContainer}>
                                <Grid item xs={12}><Typography className={styles.bashHistoryPeriodTitle}>검색기간</Typography></Grid>
                                <Grid item xs={6}>
                                  <Grid container>
                                    <Grid item xs={2}>시작일시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartYear)} onChange={(e)=>{setBashHistoryStartYear(parseInt(e.target.value ? e.target.value : 0))}} />년</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartMonth)} onChange={(e)=>{setBashHistoryStartMonth(parseInt(e.target.value ? e.target.value : 0))}} />월</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartDate)} onChange={(e)=>{setBashHistoryStartDate(parseInt(e.target.value ? e.target.value : 0))}} />일</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartHour)} onChange={(e)=>{setBashHistoryStartHour(parseInt(e.target.value ? e.target.value : 0))}} />시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartMinute)} onChange={(e)=>{setBashHistoryStartMinute(parseInt(e.target.value ? e.target.value : 0))}} />분</Grid>
                                    
                                    <Grid item xs={2}>종료일시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndYear)} onChange={(e)=>{setBashHistoryEndYear(parseInt(e.target.value ? e.target.value : 0))}} />년</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndMonth)} onChange={(e)=>{setBashHistoryEndMonth(parseInt(e.target.value ? e.target.value : 0))}} />월</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndDate)} onChange={(e)=>{setBashHistoryEndDate(parseInt(e.target.value ? e.target.value : 0))}} />일</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndHour)} onChange={(e)=>{setBashHistoryEndHour(parseInt(e.target.value ? e.target.value : 0))}} />시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndMinute)} onChange={(e)=>{setBashHistoryEndMinute(parseInt(e.target.value ? e.target.value : 0))}} />분</Grid>
                                  </Grid>
                                </Grid>
                              
                              </Grid>
                              <Grid container className={styles.bashHistoryStudentContainer}>
                                <Grid item xs={2}><Typography className={styles.bashHistoryPeriodTitle}>학생</Typography></Grid> {/* 별도의 선택이 없으면 전체 학생을 대상으로 검색됩니다. */}
                                <Grid item xs={10} className={styles.bashHistoryStudentSelectItem}><EditIcon className={styles.bashHistoryStudentSelectButton} onClick={handleStudentListModalOpen} /></Grid>
                                {
                                  bashHistoryStudentList.map((student)=>{
                                    return (
                                      <Chip className={styles.studentListChip} label={student} variant="outlined" />
                                    )
                                  })
                                }
                              </Grid>
                              <Grid container className={styles.bashHistoryKeywordContainer}>
                                <Grid item xs={12}><Typography className={styles.bashHistoryPeriodTitle}>키워드</Typography></Grid>
                                <Grid item xs={2} className={styles.bashHistoryKeywordSubTitle}><div className={styles.bashHistoryKeywordInputTitle}>포함 키워드 (최대 5개)</div></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2} className={styles.bashHistoryKeywordSubTitle}><div className={styles.bashHistoryKeywordInputTitle}>제외 키워드 (최대 5개)</div></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                                <Grid item xs={2}><input className={styles.bashHistoryKeywordInput} type='text' /></Grid>
                              </Grid>
                              <Grid container justifyContent={'center'}>
                                <Grid item xs={12} className={styles.bashHistorySearch}>
                                  <Button onClick={handleBashHistory} className={styles.bashHistoryButton} variant='contained' fullWidth={true}>검색</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                : monitoringCategory=='설치 프로그램' ?
                installedProgramResult ?
                // #평가모듈 - 설치 프로그램 결과
                <Fragment>
                <Grid container className={styles.monitoringResultHeader} justifyContent={'flex-end'}>
                  <Grid item xs={2} className={styles.monitoringResultHeaderButton}>
                    <div onClick={()=>{/*api 완성되면 새로고침함수 추가필요*/}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                    <div onClick={()=>{setInstalledProgramResult(false)}}>{`검색창 돌아가기`}</div>
                  </Grid>
                </Grid>
                <Grid container className={styles.successOrFailResultBody} spacing={4}>
                      <Grid item xs={6}>
                        <div container className={styles.successOrFailResultContainer}>
                          <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`설치 명단 (${installedProgramDummyResult.filter((item)=>item.status).length}/${installedProgramDummyResult.length})`}</Typography></div>
                          <div className={styles.successOrFailItemBody}>
                            <Grid container>
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramSuccessStudentMoreSearch} onChange={(e)=>{setInstalledProgramSuccessStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={6}>설치경로<input value={installedProgramSuccessPathMoreSearch} onChange={(e)=>{setInstalledProgramSuccessPathMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>버전<input value={installedProgramSuccessVersionMoreSearch} onChange={(e)=>{setInstalledProgramSuccessVersionMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            {
                              installedProgramDummyResult.filter((item, index)=>{
                                return item.status && (`${index+1}번 학생명 필요`).includes(installedProgramSuccessStudentMoreSearch) && item.installed.includes(installedProgramSuccessPathMoreSearch) && item.version.includes(installedProgramSuccessVersionMoreSearch)
                              }).map((student, index)=>{
                                return(
                                  <Fragment>
                                    <Grid item xs={3} className={styles.successLine}>{`${index+1}번 학생명 필요`}</Grid>
                                    <Grid item xs={6} className={styles.successLine}><div>{student.installed}</div></Grid>
                                    <Grid item xs={3} className={styles.successLine}>{student.version}</Grid>
                                  </Fragment>
                                )
                              })
                            }
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div container className={styles.successOrFailResultContainer}>
                          <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`미설치 명단 (${installedProgramDummyResult.filter((item)=>!item.status).length}/${installedProgramDummyResult.length})`}</Typography></div>
                          <div className={styles.successOrFailItemBody}>
                            <Grid container>
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramFailStudentMoreSearch} onChange={(e)=>{setInstalledProgramFailStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={9}>원격 접속<div className={styles.DdemBbangMessage}># 버튼 클릭하여 학생 컨테이너로 이동</div></Grid>
                            {
                              installedProgramDummyResult.filter((item, index)=>{
                                return !item.status && (`${index+1}번 학생명 필요`).includes(installedProgramFailStudentMoreSearch) && item.installed.includes(installedProgramFailPathMoreSearch) && item.version.includes(installedProgramFailVersionMoreSearch)
                              }).map((student, index)=>{
                                return(
                                  <Fragment>
                                    <Grid item xs={3} className={styles.failLine}>{`${index+1}번 학생명 필요`}</Grid>
                                    <Grid item xs={9} className={styles.failLine}><Button color='error' className={styles.DdemBbangButton}>접속하기</Button></Grid>
                                  </Fragment>
                                )
                              })
                            }
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                </Grid>
                </Fragment>
                :
                // #평가모듈 - 설치 프로그램
                <Grid container className={styles.monitoringBody} spacing={4}>
                  <Grid item xs={12}>
                    <Grid container className={styles.monitoringItem} justifyContent='center'>
                      <Grid item xs={10} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'설치 프로그램'}</Typography></Grid>
                      <Grid item xs={11}>
                        <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                          <Grid item xs={11}>
                            <Grid container spacing={2} className={styles.installedProgramTypeContainer}>
                              <Grid item xs={12}><Typography className={styles.bashHistoryPeriodTitle}>설치방식</Typography></Grid>
                              <Grid item xs={6}><Button onClick={()=>{setInstalledProgramType(0)}} className={installedProgramType==0 ? styles.bashHistoryButton : styles.bashHistoryButton_disabled} variant='contained' fullWidth={true}>패키지</Button></Grid>
                              <Grid item xs={6}><Button onClick={()=>{setInstalledProgramType(1)}} className={installedProgramType==0 ? styles.bashHistoryButton_disabled : styles.bashHistoryButton} variant='contained' fullWidth={true}>다운로드 받은 설치파일</Button></Grid>
                            </Grid>
                            <Grid container className={styles.installedProgramStudentContainer}>
                              <Grid item xs={2}><Typography className={styles.bashHistoryPeriodTitle}>학생</Typography></Grid>
                              <Grid item xs={10} className={styles.bashHistoryStudentSelectItem}><EditIcon className={styles.bashHistoryStudentSelectButton} onClick={()=>{setInstalledProgramDialogOpen(true)}} /></Grid>
                              {
                                installedProgramStudentList.map((student)=>{
                                  return (
                                    <Chip className={styles.studentListChip} label={student} variant="outlined" />
                                  )
                                })
                              }
                            </Grid>
                            <Grid container className={styles.bashHistoryKeywordContainer}>
                              <Grid item xs={6} className={styles.installedProgramSearchKeywordContainer}>
                                <div className={styles.installedProgramSearchTitle}>프로그램명</div>
                                <input className={styles.installedProgramKeywordInput} type='text' value={installedProgramName} onChange={(e)=>{setInstalledProgramName(e.target.value)}} />
                              </Grid>
                              {
                                installedProgramType==1 ?
                                <Grid item xs={6} className={styles.installedProgramSearchKeywordContainer}>
                                  <div className={styles.installedProgramSearchTitle}>검색시작경로</div>
                                  <input className={styles.installedProgramKeywordInput} type='text' value={installedProgramRootDirectory} onChange={(e)=>{setInstalledProgramRootDirectory(e.target.value)}} />
                                </Grid>
                                : 
                                ''
                              }
                            </Grid>
                            <Grid container justifyContent={'center'}>
                              <Grid item xs={12} className={styles.bashHistorySearch}>
                                <Button onClick={handleInstalledProgram} className={styles.bashHistoryButton} variant='contained' fullWidth={true}>검색</Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                : monitoringCategory=='파일 탐색' ?
                fileSearchResult ?
                // #평가모듈 - 파일 탐색 결과
                <Fragment>
                  <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                    <Grid item xs={6} className={styles.monitoringResultHeaderSearch}>
                      결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setFileSearchMoreResultKeyword(e.target.value)}} />
                      {` ( ${fileSearchDummyResult.filter((item)=>item.fileContent.replaceAll('\n','').includes(fileSearchMoreResultKeyword)).length} 명 / ${fileSearchDummyResult.length} 명 )`}
                    </Grid>
                    <Grid item xs={3} className={styles.monitoringResultHeaderButton}>
                      <div onClick={()=>{/*api 완성되면 새로고침함수 추가필요*/}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                      <div onClick={()=>{setFileSearchResult(false)}}>{`검색창 돌아가기`}</div>
                      <div onClick={()=>{setFileSearchResultViewMode(fileSearchResultViewMode==6 ? 12 : 6)}}>{`${fileSearchResultViewMode==6 ? '1' : '2'}개씩 보기`}</div>
                    </Grid>
                  </Grid>
                  <Grid container className={styles.monitoringResultBody} spacing={4}>
                    {
                      fileSearchDummyResult.filter((item)=>item.fileContent.replaceAll('\n','').includes(fileSearchMoreResultKeyword)).map((result, index)=>{
                        return(
                        <Grid item xs={fileSearchResultViewMode}>
                          <div container className={styles.monitoringResultItem}>
                            <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${index+1}번 학생명 필요`}</Typography></div>
                            <div className={styles.resultItemBody}>
                              {
                                result.fileContent.split('\n').map((line, index) => {
                                  return (
                                    index+1!=result.fileContent.split('\n').length ? 
                                    <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{`${line}`}</span></div>
                                    : ''
                                  )
                                })
                              }
                            </div>
                          </div>
                        </Grid>
                        )
                      })
                    }
                  </Grid>
                </Fragment>
                :
                // #평가모듈 - 파일 탐색
                <Grid container className={styles.monitoringBody} spacing={4}>
                  <Grid item xs={12}>
                    <Grid container className={styles.monitoringItem} justifyContent='center'>
                      <Grid item xs={10} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'파일 탐색'}</Typography></Grid>
                      <Grid item xs={11}>
                        <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                          <Grid item xs={11}>
                            <Grid container className={styles.installedProgramStudentContainer}>
                              <Grid item xs={2}><Typography className={styles.bashHistoryPeriodTitle}>학생</Typography></Grid>
                              <Grid item xs={10} className={styles.bashHistoryStudentSelectItem}><EditIcon className={styles.bashHistoryStudentSelectButton} onClick={()=>{setFileSearchDialogOpen(true)}} /></Grid>
                              {
                                fileSearchStudentList.map((student)=>{
                                  return (
                                    <Chip className={styles.studentListChip} label={student} variant="outlined" />
                                  )
                                })
                              }
                            </Grid>
                            <Grid container className={styles.bashHistoryKeywordContainer}>
                              <Grid item xs={6} className={styles.installedProgramSearchKeywordContainer}>
                                <div className={styles.filePathSearchTitle}>파일경로(파일명 포함)</div>
                                <input className={styles.fileSearchKeywordInput} type='text' value={fileSearchDirectory} onChange={(e)=>{setFileSearchDirectory(e.target.value)}} />
                              </Grid>
                            </Grid>
                            <Grid container justifyContent={'center'}>
                              <Grid item xs={12} className={styles.bashHistorySearch}>
                                <Button onClick={handleFileSearch} className={styles.bashHistoryButton} variant='contained' fullWidth={true}>검색</Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                : monitoringCategory=='네트워크 패킷' ?
                  networkPacketResult==2 ?
                  // #평가모듈 - 네트워크 패킷 결과
                  <Fragment>
                    <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                      <Grid item xs={6} className={styles.monitoringResultHeaderSearch}>
                        결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setFileSearchMoreResultKeyword(e.target.value)}} /> ( 40명 / 40명 )
                      </Grid>
                      <Grid item xs={3} className={styles.monitoringResultHeaderButton}>
                        <div onClick={()=>{/*api 완성되면 새로고침함수 추가필요*/}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                        <div onClick={()=>{setNetworkPacketResult(0)}}>{`검색창 돌아가기`}</div>
                        <div onClick={()=>{setNetworkPacketResultViewMode(networkPacketResultViewMode==6 ? 12 : 6)}}>{`${networkPacketResultViewMode==6 ? '1' : '2'}개씩 보기`}</div>
                      </Grid>
                    </Grid>
                    <Grid container className={styles.monitoringResultBody} spacing={4}>
                      {
                        networkPacketDummyResult.map((result, index)=>{
                          return(
                          <Grid item xs={12}>
                            <div container className={styles.monitoringResultItem}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${index+1}번 학생명 필요`}</Typography></div>
                              <div className={styles.resultItemBody}>
                                <Grid container className={styles.netowrkPacketResultTableTitle_top}>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={2}></Grid>
                                  <Grid item xs={5}><div className={styles.successOrFailTableTitle_right}>SOURCE</div></Grid>
                                  <Grid item xs={5}><div className={styles.successOrFailTableTitle_right}>DESTINATION</div></Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={1}>일시</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={1}>프로토콜</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={2}>MAC</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={2}>IP</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={1}>PORT</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={2}>MAC</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={2}>IP</Grid>
                                  <Grid item className={styles.successOrFailTableTitle_right} xs={1}>PORT</Grid>
                                </Grid>
                                  {
                                    result.packet.map((packet)=>{
                                      return (
                                      <Grid container className={styles.netowrkPacketResultTableTitle}>
                                      <Grid className={styles.successOrFailTableTitle_right_margin} item xs={1}>{new Date(packet.time).toLocaleTimeString()}</Grid>
                                      <Grid className={styles.successOrFailTableTitle_right_margin} item xs={1}>{packet.protocol}</Grid>
                                      <Grid className={styles.successOrFailTableTitle_right_margin} item xs={2}>{packet.src.mac}</Grid>
                                      <Grid className={styles.successOrFailTableTitle_right_margin} item xs={2}>{packet.src.ip}</Grid>
                                      <Grid className={styles.successOrFailTableTitle_right_margin} item xs={1}>{packet.src.port}</Grid>
                                      <Grid item xs={5}>
                                        <Grid container>
                                          <Grid className={styles.successOrFailTableTitle_right} item xs={4}>{packet.dst.mac}</Grid>
                                          <Grid className={styles.successOrFailTableTitle_right} item xs={4}>{packet.dst.ip}</Grid>
                                          <Grid className={styles.successOrFailTableTitle_right} item xs={4}>{packet.dst.port}</Grid>
                                          <Grid className={styles.successOrFailTableTitle_right} item xs={12}>{packet.dst.dns}</Grid>
                                        </Grid>
                                      </Grid>
                                      </Grid>
                                      )
                                    })
                                  }
                              </div>
                            </div>
                          </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Fragment>
                  : networkPacketResult==1 ?
                  // #평가모듈 - 네트워크 패킷 결과현황
                  <Fragment>
                    <Grid container className={styles.monitoringResultHeader} justifyContent={'flex-end'}>
                      <Grid item xs={2} className={styles.monitoringResultHeaderButton}>
                        <div onClick={()=>{/*api 완성되면 새로고침함수 추가필요*/}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                        <div onClick={()=>{setNetworkPacketResult(0)}}>{`검색창 돌아가기`}</div>
                      </Grid>
                    </Grid>
                    <Grid container className={styles.successOrFailResultBody} spacing={4}>
                          <Grid item xs={6}>
                            <div container className={styles.successOrFailResultContainer}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`설치 명단 (${installedProgramDummyResult.filter((item)=>item.status).length}/${installedProgramDummyResult.length})`}</Typography></div>
                              <div className={styles.successOrFailItemBody}>
                                <Grid container>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramSuccessStudentMoreSearch} onChange={(e)=>{setInstalledProgramSuccessStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={6}>설치경로<input value={installedProgramSuccessPathMoreSearch} onChange={(e)=>{setInstalledProgramSuccessPathMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>버전<input value={installedProgramSuccessVersionMoreSearch} onChange={(e)=>{setInstalledProgramSuccessVersionMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                {
                                  installedProgramDummyResult.filter((item, index)=>{
                                    return item.status && (`${index+1}번 학생명 필요`).includes(installedProgramSuccessStudentMoreSearch) && item.installed.includes(installedProgramSuccessPathMoreSearch) && item.version.includes(installedProgramSuccessVersionMoreSearch)
                                  }).map((student, index)=>{
                                    return(
                                      <Fragment>
                                        <Grid item xs={3} className={styles.successLine}>{`${index+1}번 학생명 필요`}</Grid>
                                        <Grid item xs={6} className={styles.successLine}><div>{student.installed}</div></Grid>
                                        <Grid item xs={3} className={styles.successLine}>{student.version}</Grid>
                                      </Fragment>
                                    )
                                  })
                                }
                                </Grid>
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div container className={styles.successOrFailResultContainer}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`미설치 명단 (${installedProgramDummyResult.filter((item)=>!item.status).length}/${installedProgramDummyResult.length})`}</Typography></div>
                              <div className={styles.successOrFailItemBody}>
                                <Grid container>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramFailStudentMoreSearch} onChange={(e)=>{setInstalledProgramFailStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={9}>원격 접속<div className={styles.DdemBbangMessage}># 버튼 클릭하여 학생 컨테이너로 이동</div></Grid>
                                {
                                  installedProgramDummyResult.filter((item, index)=>{
                                    return !item.status && (`${index+1}번 학생명 필요`).includes(installedProgramFailStudentMoreSearch) && item.installed.includes(installedProgramFailPathMoreSearch) && item.version.includes(installedProgramFailVersionMoreSearch)
                                  }).map((student, index)=>{
                                    return(
                                      <Fragment>
                                        <Grid item xs={3} className={styles.failLine}>{`${index+1}번 학생명 필요`}</Grid>
                                        <Grid item xs={9} className={styles.failLine}><Button color='error' className={styles.DdemBbangButton}>접속하기</Button></Grid>
                                      </Fragment>
                                    )
                                  })
                                }
                                </Grid>
                              </div>
                            </div>
                          </Grid>
                    </Grid>
                  </Fragment>
                  // #평가모듈 - 네트워크 패킷
                  :
                  <Grid container className={styles.monitoringBody} spacing={4}>
                    <Grid item xs={12}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'네트워크 패킷'}</Typography></Grid>
                        <Grid item xs={11}>
                          <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                            <Grid item xs={11}>
                              <Grid container className={styles.installedProgramStudentContainer}>
                                <Grid item xs={2}><Typography className={styles.bashHistoryPeriodTitle}>학생</Typography></Grid>
                                <Grid item xs={10} className={styles.bashHistoryStudentSelectItem}><EditIcon className={styles.bashHistoryStudentSelectButton} onClick={()=>{setNetworkPacketDialogOpen(true)}} /></Grid>
                                {
                                networkPacketStudentList.map((student)=>{
                                  return (
                                    <Chip className={styles.studentListChip} label={student} variant="outlined" />
                                  )
                                })
                                }
                                <Grid item xs={12}><Typography className={styles.networkPacketPeriodTitle}>검색기간</Typography></Grid>
                                <Grid item xs={6}>
                                  <Grid container>
                                    <Grid item xs={2}>시작일시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartYear)} onChange={(e)=>{setBashHistoryStartYear(parseInt(e.target.value ? e.target.value : 0))}} />년</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartMonth)} onChange={(e)=>{setBashHistoryStartMonth(parseInt(e.target.value ? e.target.value : 0))}} />월</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartDate)} onChange={(e)=>{setBashHistoryStartDate(parseInt(e.target.value ? e.target.value : 0))}} />일</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartHour)} onChange={(e)=>{setBashHistoryStartHour(parseInt(e.target.value ? e.target.value : 0))}} />시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryStartMinute)} onChange={(e)=>{setBashHistoryStartMinute(parseInt(e.target.value ? e.target.value : 0))}} />분</Grid>
                                    
                                    <Grid item xs={2}>종료일시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndYear)} onChange={(e)=>{setBashHistoryEndYear(parseInt(e.target.value ? e.target.value : 0))}} />년</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndMonth)} onChange={(e)=>{setBashHistoryEndMonth(parseInt(e.target.value ? e.target.value : 0))}} />월</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndDate)} onChange={(e)=>{setBashHistoryEndDate(parseInt(e.target.value ? e.target.value : 0))}} />일</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndHour)} onChange={(e)=>{setBashHistoryEndHour(parseInt(e.target.value ? e.target.value : 0))}} />시</Grid>
                                    <Grid item xs={2}><input className={styles.bashHistoryPeriod} type='text' value={String(bashHistoryEndMinute)} onChange={(e)=>{setBashHistoryEndMinute(parseInt(e.target.value ? e.target.value : 0))}} />분</Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid container className={styles.bashHistoryKeywordContainer}>
                                <Grid item xs={6} className={styles.installedProgramSearchKeywordContainer}>
                                  <div className={styles.networkPacketSearchTitle}>프로토콜</div>
                                  <input className={styles.networkPacketLengthInput} />
                                </Grid>
                              </Grid>
                              <Grid container className={styles.bashHistoryKeywordContainer}>
                                <Grid item xs={6} className={styles.installedProgramSearchKeywordContainer}>
                                  <div className={styles.networkPacketSearchTitle}>패킷길이</div>
                                  <input className={styles.networkPacketLengthInput} />~<input className={styles.networkPacketLengthInput} />
                                </Grid>
                              </Grid>
                              <Grid container className={styles.bashHistoryKeywordContainer}>
                                <Grid item xs={6} className={styles.installedProgramSearchKeywordContainer}>
                                  <div className={styles.networkPacketSearchTitle}>상세조건</div>
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item xs={2}>#</Grid>
                                <Grid item xs={5}>SOURCE</Grid>
                                <Grid item xs={5}>DESTINATION</Grid>
                                <Grid item xs={2}>MAC</Grid>
                                <Grid item xs={5}><input className={styles.networkPacketKeywordInput} /></Grid>
                                <Grid item xs={5}><input className={styles.networkPacketKeywordInput} /></Grid>
                                <Grid item xs={2}>IP</Grid>
                                <Grid item xs={5}><input className={styles.networkPacketKeywordInput} /></Grid>
                                <Grid item xs={5}><input className={styles.networkPacketKeywordInput} /></Grid>
                                <Grid item xs={2}>PORT</Grid>
                                <Grid item xs={5}><input className={styles.networkPacketKeywordInput} /></Grid>
                                <Grid item xs={5}><input className={styles.networkPacketKeywordInput} /></Grid>
                              </Grid>
                              <Grid container justifyContent={'center'}>
                                <Grid item xs={12} className={styles.bashHistorySearch}>
                                  <Button onClick={handleNetworkPacket} className={styles.bashHistoryButton} variant='contained' fullWidth={true}>검색</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                : monitoringCategory=='명령어 실행' ?
                commandResult==2 || commandResult==3 ?
                  // #평가모듈 - 명령어 실행 결과
                  <Fragment>
                    <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                    <Grid item xs={5} className={styles.monitoringResultHeaderSearch}>
                        결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setCommandMoreSearch(e.target.value)}} />
                      </Grid>
                      <Grid item xs={7} className={styles.monitoringResultHeaderButton}>
                        <div onClick={handleCommand} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                        <div onClick={()=>{setCommandResult(1)}}>{`전체 모아보기`}</div>
                        <div onClick={()=>{setCommandResult(2)}}>{`조건 충족 모아보기`}</div>
                        <div onClick={()=>{setCommandResult(3)}}>{`조건 미충족 모아보기`}</div>
                        <div onClick={()=>{setCommandResult(0)}}>{`검색창 돌아가기`}</div>
                      </Grid>
                    </Grid>
                    <Grid container className={styles.monitoringResultBody} spacing={4}>
                      {
                        commandResult == 2 ?
                        commandResultList.filter((item)=>item.commandResult.replaceAll('\n','').includes(commandMoreSearch)).map((result, index)=>{
                          return(
                          <Grid item xs={fileSearchResultViewMode}>
                            <div container className={styles.monitoringResultItem}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${index+1}번 학생명 필요`}</Typography></div>
                              <div className={styles.resultItemBody}>
                                {
                                  result.commandResult.split('\n').map((line, index) => {
                                    return (
                                      index+1!=result.commandResult.split('\n').length ? 
                                      <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{`${line}`}</span></div>
                                      : ''
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </Grid>
                          )
                        })
                        :
                        commandResultList.filter((item)=>!item.commandResult.replaceAll('\n','').includes(commandMoreSearch)).map((result, index)=>{
                          return(
                          <Grid item xs={fileSearchResultViewMode}>
                            <div container className={styles.monitoringResultItem}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${index+1}번 학생명 필요`}</Typography></div>
                              <div className={styles.resultItemBody}>
                                {
                                  result.commandResult.split('\n').map((line, index) => {
                                    return (
                                      index+1!=result.commandResult.split('\n').length ? 
                                      <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{`${line}`}</span></div>
                                      : ''
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Fragment>
                  : commandResult==1 ?
                  // #평가모듈 - 명령어 실행 결과현황
                  <Fragment>
                    <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                      <Grid item xs={5} className={styles.monitoringResultHeaderSearch}>
                        결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setCommandMoreSearch(e.target.value)}} />
                      </Grid>
                      <Grid item xs={7} className={styles.monitoringResultHeaderButton}>
                        <div onClick={handleCommand} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                        <div onClick={()=>{setCommandResult(1)}}>{`전체 모아보기`}</div>
                        <div onClick={()=>{setCommandResult(2)}}>{`조건 충족 모아보기`}</div>
                        <div onClick={()=>{setCommandResult(3)}}>{`조건 미충족 모아보기`}</div>
                        <div onClick={()=>{setCommandResult(0)}}>{`검색창 돌아가기`}</div>
                      </Grid>
                    </Grid>
                    <Grid container className={styles.successOrFailResultBody} spacing={4}>
                          <Grid item xs={6}>
                            <div container className={styles.successOrFailResultContainer}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`조건 충족 (${commandResultList.filter((item)=>!commandMoreSearch||item.commandResult==commandMoreSearch).length}/${commandResultList.length})`}</Typography></div>
                              <div className={styles.successOrFailItemBody}>
                                <Grid container>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramSuccessStudentMoreSearch} onChange={(e)=>{setInstalledProgramSuccessStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={9}>실행결과<input value={installedProgramSuccessPathMoreSearch} onChange={(e)=>{setInstalledProgramSuccessPathMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                {
                                  commandResultList.filter((item)=>!commandMoreSearch||item.commandResult==commandMoreSearch).map((student, index)=>{
                                    return(
                                      <Fragment>
                                        <Grid item xs={3} className={styles.successLine}>{`${nStudentList.filter((e)=>e.studentId==student.studentId)[0].studentName}`}</Grid>
                                        <Grid item xs={9} className={styles.successLine}><div>{student.commandResult}</div></Grid>
                                      </Fragment>
                                    )
                                  })
                                }
                                </Grid>
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div container className={styles.successOrFailResultContainer}>
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`조건 미충족 (${commandResultList.filter((item)=>commandMoreSearch&&item.commandResult!=commandMoreSearch).length}/${commandResultList.length})`}</Typography></div>
                              <div className={styles.successOrFailItemBody}>
                                <Grid container>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramFailStudentMoreSearch} onChange={(e)=>{setInstalledProgramFailStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={9}>실행결과<input value={installedProgramSuccessPathMoreSearch} onChange={(e)=>{setInstalledProgramSuccessPathMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                {
                                  commandResultList.filter((item)=>commandMoreSearch&&item.commandResult!=commandMoreSearch).map((student, index)=>{
                                    return(
                                      <Fragment>
                                        <Grid item xs={3} className={styles.failLine}>{`${nStudentList.filter((e)=>e.studentId==student.studentId)[0].studentName}`}</Grid>
                                        <Grid item xs={9} className={styles.failLine}><div>{student.commandResult}</div></Grid>
                                      </Fragment>
                                    )
                                  })
                                }
                                </Grid>
                              </div>
                            </div>
                          </Grid>
                    </Grid>
                  </Fragment>
                  // #평가모듈 - 명령어 실행
                  :
                  <Grid container className={styles.monitoringBody} spacing={4}>
                    <Grid item xs={12}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'명령어 실행'}</Typography></Grid>
                        <Grid item xs={11}>
                          <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                            <Grid item xs={11}>
                              <Grid container className={styles.installedProgramStudentContainer}>
                                <Grid item xs={2}><Typography className={styles.bashHistoryPeriodTitle}>학생</Typography></Grid>
                                <Grid item xs={10} className={styles.bashHistoryStudentSelectItem}><EditIcon className={styles.bashHistoryStudentSelectButton} onClick={()=>{setNetworkPacketDialogOpen(true)}} /></Grid>
                                {
                                networkPacketStudentList.map((student)=>{
                                  return (
                                    <Chip className={styles.studentListChip} label={student} variant="outlined" />
                                  )
                                })
                                }
                              </Grid>
                              <Grid container className={styles.bashHistoryKeywordContainer}>
                                <Grid item xs={12} className={styles.installedProgramSearchKeywordContainer}>
                                  <div className={styles.bashHistoryPeriodTitle}>명령어</div>
                                  <input type={'text'} className={styles.commandLengthInput} onChange={(e)=>{setCommandString(e.target.value)}} />
                                </Grid>
                              </Grid>
                              <Grid container justifyContent={'center'}>
                                <Grid item xs={12} className={styles.bashHistorySearch}>
                                  <Button onClick={handleCommand} className={styles.bashHistoryButton} variant='contained' fullWidth={true}>검색</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                : monitoringCategory=='스크립트 실행' ?
                <Fragment>
                  <Grid container className={styles.monitoringBody} spacing={4}>
                    <Grid item xs={6}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'명령어 실행'}</Typography></Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'스크립트 실행'}</Typography></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        {/* <Grid item xs={10}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{''}</Typography></Grid> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        {/* <Grid item xs={10}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{''}</Typography></Grid> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Fragment>
                : monitoringCategory=='과제 및 실시간 퀴즈' ?
                  <Grid container className={styles.monitoringBody}>
                    <Grid item xs={12}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'과제 및 실시간 퀴즈'}</Typography></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                : monitoringCategory=='O/X 체크' ?
                  <Grid container className={styles.monitoringBody}>
                    <Grid item xs={12}>
                      <Grid container className={styles.monitoringItem} justifyContent='center'>
                        <Grid item xs={10}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'O/X 체크'}</Typography></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                :
                ''
              }
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* 학생선택 - BASH 기록 */}
      <Dialog
        open={studentListModalOpen}
        onClose={handleStudentListModalClose}
        fullWidth={true}
        maxWidth={'md'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={handleStudentListModalClose} />
        <DialogContent className={styles.studentListDialogContent}>
        <div><PeopleIcon className={styles.studentListDialogTitleIcon} /><Typography className={styles.studentListDialogTitle} variant='h5'>학생목록</Typography></div>
          <Grid container spacing={2} className={styles.studentListDialogContainer} justifyContent="center" alignItems="center">
          <Grid item>{customList('미선택', noneBashHistoryStudentList, bashHistoryStudentChecked, setBashHistoryStudentChecked)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedRight(bashHistoryStudentChecked, setBashHistoryStudentChecked, noneBashHistoryStudentList, setNoneBashHistoryStudentList, bashHistoryStudentList, setBashHistoryStudentList)}} disabled={intersection(bashHistoryStudentChecked, noneBashHistoryStudentList).length === 0} aria-label="move selected right">&gt;</Button>
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedLeft(bashHistoryStudentChecked, setBashHistoryStudentChecked, noneBashHistoryStudentList, setNoneBashHistoryStudentList, bashHistoryStudentList, setBashHistoryStudentList)}} disabled={intersection(bashHistoryStudentChecked, bashHistoryStudentList).length === 0} aria-label="move selected left">&lt;</Button>
            </Grid>
          </Grid>
          <Grid item>{customList('선택됨', bashHistoryStudentList, bashHistoryStudentChecked, setBashHistoryStudentChecked)}</Grid>
        </Grid>
        </DialogContent>
      </Dialog>

      {/* 학생선택 - 설치 프로그램 */}
      <Dialog
        open={installedProgramDialogOpen}
        onClose={()=>{setInstalledProgramDialogOpen(true)}}
        fullWidth={true}
        maxWidth={'md'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={()=>{setInstalledProgramDialogOpen(false)}} />
        <DialogContent className={styles.studentListDialogContent}>
        <div><PeopleIcon className={styles.studentListDialogTitleIcon} /><Typography className={styles.studentListDialogTitle} variant='h5'>학생목록</Typography></div>
          <Grid container spacing={2} className={styles.studentListDialogContainer} justifyContent="center" alignItems="center">
          <Grid item>{customList('미선택', noneInstalledProgramStudentList, installedProgramStudentChecked, setInstalledProgramStudentChecked)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedRight(installedProgramStudentChecked, setInstalledProgramStudentChecked, noneInstalledProgramStudentList, setNoneInstalledProgramStudentList, installedProgramStudentList, setInstalledProgramStudentList)}} disabled={intersection(installedProgramStudentChecked, noneInstalledProgramStudentList).length === 0} aria-label="move selected right">&gt;</Button>
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedLeft(installedProgramStudentChecked, setInstalledProgramStudentChecked, noneInstalledProgramStudentList, setNoneInstalledProgramStudentList, installedProgramStudentList, setInstalledProgramStudentList)}} disabled={intersection(installedProgramStudentChecked, installedProgramStudentList).length === 0} aria-label="move selected left">&lt;</Button>
            </Grid>
          </Grid>
          <Grid item>{customList('선택됨', installedProgramStudentList, installedProgramStudentChecked, setInstalledProgramStudentChecked)}</Grid>
        </Grid>
        </DialogContent>
      </Dialog>

      {/* 학생선택 - 파일 탐색 */}
      <Dialog
        open={fileSearchDialogOpen}
        onClose={()=>{setFileSearchDialogOpen(true)}}
        fullWidth={true}
        maxWidth={'md'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={()=>{setFileSearchDialogOpen(false)}} />
        <DialogContent className={styles.studentListDialogContent}>
        <div><PeopleIcon className={styles.studentListDialogTitleIcon} /><Typography className={styles.studentListDialogTitle} variant='h5'>학생목록</Typography></div>
          <Grid container spacing={2} className={styles.studentListDialogContainer} justifyContent="center" alignItems="center">
          <Grid item>{customList('미선택', noneFileSearchStudentList, fileSearchStudentChecked, setFileSearchStudentChecked)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedRight(fileSearchStudentChecked, setFileSearchStudentChecked, noneFileSearchStudentList, setNoneFileSearchStudentList, fileSearchStudentList, setFileSearchStudentList)}} disabled={intersection(fileSearchStudentChecked, noneFileSearchStudentList).length === 0} aria-label="move selected right">&gt;</Button>
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedLeft(fileSearchStudentChecked, setFileSearchStudentChecked, noneFileSearchStudentList, setNoneFileSearchStudentList, fileSearchStudentList, setFileSearchStudentList)}} disabled={intersection(fileSearchStudentChecked, fileSearchStudentList).length === 0} aria-label="move selected left">&lt;</Button>
            </Grid>
          </Grid>
          <Grid item>{customList('선택됨', fileSearchStudentList, fileSearchStudentChecked, setFileSearchStudentChecked)}</Grid>
        </Grid>
        </DialogContent>
      </Dialog>

      {/* 학생선택 - 네트워크 패킷 */}
      <Dialog
        open={networkPacketDialogOpen}
        onClose={()=>{setNetworkPacketDialogOpen(true)}}
        fullWidth={true}
        maxWidth={'md'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={()=>{setNetworkPacketDialogOpen(false)}} />
        <DialogContent className={styles.studentListDialogContent}>
        <div><PeopleIcon className={styles.studentListDialogTitleIcon} /><Typography className={styles.studentListDialogTitle} variant='h5'>학생목록</Typography></div>
          <Grid container spacing={2} className={styles.studentListDialogContainer} justifyContent="center" alignItems="center">
          <Grid item>{customList('미선택', noneNetworkPacketStudentList, networkPacketStudentChecked, setNetworkPacketStudentChecked)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedRight(networkPacketStudentChecked, setNetworkPacketStudentChecked, noneNetworkPacketStudentList, setNoneNetworkPacketStudentList, networkPacketStudentList, setNetworkPacketStudentList)}} disabled={intersection(networkPacketStudentChecked, noneNetworkPacketStudentList).length === 0} aria-label="move selected right">&gt;</Button>
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedLeft(networkPacketStudentChecked, setNetworkPacketStudentChecked, noneNetworkPacketStudentList, setNoneNetworkPacketStudentList, networkPacketStudentList, setNetworkPacketStudentList)}} disabled={intersection(networkPacketStudentChecked, networkPacketStudentList).length === 0} aria-label="move selected left">&lt;</Button>
            </Grid>
          </Grid>
          <Grid item>{customList('선택됨', networkPacketStudentList, networkPacketStudentChecked, setNetworkPacketStudentChecked)}</Grid>
        </Grid>
        </DialogContent>
      </Dialog>

      {/* 학생선택 - 명령어 실행 */}
      <Dialog
        open={commandDialogOpen}
        onClose={()=>{setCommandDialogOpen(true)}}
        fullWidth={true}
        maxWidth={'md'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={()=>{setCommandDialogOpen(false)}} />
        <DialogContent className={styles.studentListDialogContent}>
        <div><PeopleIcon className={styles.studentListDialogTitleIcon} /><Typography className={styles.studentListDialogTitle} variant='h5'>학생목록</Typography></div>
          <Grid container spacing={2} className={styles.studentListDialogContainer} justifyContent="center" alignItems="center">
          <Grid item>{customList('미선택', noneCommandStudentList, commandStudentChecked, setCommandStudentChecked)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedRight(commandStudentChecked, setCommandStudentChecked, noneCommandStudentList, setNoneCommandStudentList, commandStudentList, setCommandStudentList)}} disabled={intersection(commandStudentChecked, noneCommandStudentList).length === 0} aria-label="move selected right">&gt;</Button>
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedLeft(commandStudentChecked, setCommandStudentChecked, noneCommandStudentList, setNoneCommandStudentList, commandStudentList, setCommandStudentList)}} disabled={intersection(commandStudentChecked, commandStudentList).length === 0} aria-label="move selected left">&lt;</Button>
            </Grid>
          </Grid>
          <Grid item>{customList('선택됨', commandStudentList, commandStudentChecked, setCommandStudentChecked)}</Grid>
        </Grid>
        </DialogContent>
      </Dialog>

      {/* 학생선택 - 스크립트 실행 */}
      <Dialog
        open={scriptDialogOpen}
        onClose={()=>{setScriptDialogOpen(true)}}
        fullWidth={true}
        maxWidth={'md'}
      >
        <ClearIcon className={styles.monitoringModalCloseIcon} onClick={()=>{setScriptDialogOpen(false)}} />
        <DialogContent className={styles.studentListDialogContent}>
        <div><PeopleIcon className={styles.studentListDialogTitleIcon} /><Typography className={styles.studentListDialogTitle} variant='h5'>학생목록</Typography></div>
          <Grid container spacing={2} className={styles.studentListDialogContainer} justifyContent="center" alignItems="center">
          <Grid item>{customList('미선택', noneScriptStudentList, scriptStudentChecked, setScriptStudentChecked)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedRight(scriptStudentChecked, setScriptStudentChecked, noneScriptStudentList, setNoneScriptStudentList, scriptStudentList, setScriptStudentList)}} disabled={intersection(scriptStudentChecked, noneScriptStudentList).length === 0} aria-label="move selected right">&gt;</Button>
              <Button className={styles.studentListTransferButton} sx={{ my: 0.5 }} variant="contained" color="error" size="small" onClick={()=>{handleCheckedLeft(scriptStudentChecked, setScriptStudentChecked, noneScriptStudentList, setNoneScriptStudentList, scriptStudentList, setScriptStudentList)}} disabled={intersection(scriptStudentChecked, scriptStudentList).length === 0} aria-label="move selected left">&lt;</Button>
            </Grid>
          </Grid>
          <Grid item>{customList('선택됨', scriptStudentList, scriptStudentChecked, setScriptStudentChecked)}</Grid>
        </Grid>
        </DialogContent>
      </Dialog>
    </S.Container >
  )
}

export default GroundSidebar