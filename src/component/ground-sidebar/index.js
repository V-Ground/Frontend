import { useState, useEffect, useRef, Fragment } from 'react';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
  "installPath": "/home/user",
  "version": "2.2.1"
}}).concat(Array.from({length: 40}, ()=>{return {
  "studentId": 1,
  "status": false,
  "installPath": "",
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
  const [monitoringCategory, setMonitoringCategory] = useState('BASH 기록 확인');

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
  const [bashHistoryStudentChecked, setBashHistoryStudentChecked] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [studentListModalOpen, setStudentListModalOpen] = useState(false);
  const [bashHistoryResult, setBashHistoryResult] = useState(false);
  const [bashHistoryResultViewMode, setBashHistoryResultViewMode] = useState(6);
  const [bashHistoryMoreResultKeyword, setBashHistoryMoreResultKeyword] = useState('');
  const [bashHistoryResultList, setBashHistoryResultList] = useState([]);
  const [bashHistoryExcludeKeyword, setBashHistoryExcludeKeyword] = useState('');
  const [bashHistoryExcludeKeywordList, setBashHistoryExcludeKeywordList] = useState([]);
  const [bashHistoryExpandCheck, setBashHistoryExpandCheck] = useState([]);

  const [installedProgramDialogOpen, setInstalledProgramDialogOpen] = useState(false);
  const [installedProgramResult, setInstalledProgramResult] = useState(false);
  const [installedProgramStudentChecked, setInstalledProgramStudentChecked] = useState(nStudentList.map((student)=>{return student.studentName}));
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
  const [installedProgramResultList, setInstalledProgramResultList] = useState([]);
  const [installedProgramVersionUpdown, setInstalledProgramVersionUpdown] = useState(0);

  const [fileSearchDialogOpen, setFileSearchDialogOpen] = useState(false);
  const [fileSearchResult, setFileSearchResult] = useState(false);
  const [fileSearchStudentChecked, setFileSearchStudentChecked] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [noneFileSearchStudentList, setNoneFileSearchStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [fileSearchStudentList, setFileSearchStudentList] = useState([]);
  const [fileSearchDirectory, setFileSearchDirectory] = useState('');
  const [fileSearchSuccessStudentMoreSearch, setFileSearchSuccessStudentMoreSearch] = useState('');
  const [fileSearchSuccessFileMoreSearch, setFileSearchSuccessFileMoreSearch] = useState('');
  const [fileSearchFailStudentMoreSearch, setFileSearchFailStudentMoreSearch] = useState('');
  const [fileSearchResultViewMode, setFileSearchResultViewMode] = useState(6);
  const [fileSearchMoreResultKeyword, setFileSearchMoreResultKeyword] = useState('');
  const [fileSearchResultList, setFileSearchResultList] = useState([]);
  const [fileSearchExpandCheck, setFileSearchExpandCheck] = useState([]);

  const [insertOption, setInsertOption] = useState(1);
  const [insertSelectedFile, setInsertSelectedFile] = useState(null);

  const [networkPacketDialogOpen, setNetworkPacketDialogOpen] = useState(false);
  const [networkPacketResult, setNetworkPacketResult] = useState(0);
  const [networkPacketStudentChecked, setNetworkPacketStudentChecked] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [noneNetworkPacketStudentList, setNoneNetworkPacketStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [networkPacketStudentList, setNetworkPacketStudentList] = useState([]);
  const [networkPacketResultViewMode, setNetworkPacketResultViewMode] = useState(12);

  const [commandDialogOpen, setCommandDialogOpen] = useState(0);
  const [commandResult, setCommandResult] = useState(false);
  const [commandStudentChecked, setCommandStudentChecked] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [noneCommandStudentList, setNoneCommandStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [commandStudentList, setCommandStudentList] = useState([]);
  const [commandResultList, setCommandResultList] = useState([]);
  const [commandString, setCommandString] = useState('');
  const [commandType, setCommandType] = useState(0);
  const [commandMoreSearch, setCommandMoreSearch] = useState('');
  const [commandSuccessStudentMoreSearch, setCommandSuccessStudentMoreSearch] = useState('');
  const [commandSuccessResultMoreSearch, setCommandSuccessResultMoreSearch] = useState('');
  const [commandExpandCheck, setCommandExpandCheck] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [scriptDialogOpen, setScriptDialogOpen] = useState(0);
  const [scriptResult, setScriptResult] = useState(false);
  const [scriptStudentChecked, setScriptStudentChecked] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [noneScriptStudentList, setNoneScriptStudentList] = useState(nStudentList.map((student)=>{return student.studentName}));
  const [scriptStudentList, setScriptStudentList] = useState([]);

  const [studentActionList, setStudentActionList] = useState([]);

  const [quizOrder, setQuizOrder] = useState(0);
  const [quizStandard, setQuizStandard] = useState('');

  const actionCheck = async()=>{
    const result = await axios.get(`/v1/courses/${courseId}/task/status`);
    setStudentActionList(result.data);
    console.log(studentActionList);
  }
  const interval = useRef(null);
  useEffect(()=>{
      interval.current = setInterval(actionCheck, 1000*10);
      return () => {
          clearInterval(interval.current)
      }
  });

  const handleQuizOrder = (value, question) => {
    setQuizStandard(question);
    setQuizOrder(value);
  }

  const handleFilePush = (e) => {
    setInsertSelectedFile(e.target.files[0]);
  }

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleScript = () => {
    setScriptResult(true);
  }

  const handleFileFile = async() => {
    try {
      const formData = new FormData();
        formData.append('filePath', fileSearchDirectory);
        formData.append('inputFile', insertSelectedFile, insertSelectedFile.name);
        formData.append('insertOption', insertOption);
        formData.append('studentIds', fileSearchStudentList.length ? fileSearchStudentList.map((e)=>nStudentList.filter(item=>item.studentName==e)[0].studentId) : nStudentList.map((student)=>{return student.studentId}));
      const result = await axios.post(
        `/v1/containers/courses/${courseId}/file/insertion`, formData
      )
      console.log('파일 업로드 성공 : ', result.data);
      SuccessAlert('파일 업로드에 성공하였습니다.');
    } catch(err) {
      console.log('파일 업로드 에러 : ', err);
    }
  }

  const handleBashHistory = async() => {
    try {
      const result = await axios.post(
        `/v1/containers/courses/${courseId}/bash_history/non_realtime`, {
          "studentIds": bashHistoryStudentList.length ? bashHistoryStudentList.map((e)=>nStudentList.filter(item=>item.studentName==e)[0].studentId) : nStudentList.map((student)=>{return student.studentId}),
          "excludes": [bashHistoryExcludeKeyword]
        }
      );
      console.log('BASH기록 성공 : ', result.data);
      setBashHistoryResultList(result.data);
      setBashHistoryExpandCheck(Array.from({length: result.data.length}, ()=>true))
      setBashHistoryResult(true);
    } catch(err) {
      console.log('BASH기록 에러 : ', err);
    }
  }

  const handleCommand = async() => {
    try {
      if (!selectedFile?.name) {
        const result = await axios.post(
          `/v1/containers/courses/${courseId}/remote_command`, {
            "studentIds": commandStudentList.length ? commandStudentList.map((e)=>nStudentList.filter(item=>item.studentName==e)[0].studentId) : nStudentList.map((student)=>{return student.studentId}),
            "command": commandString
        }
        );
        console.log('원격명령실행 성공 : ', result.data);
        setCommandResultList(result.data);
        setCommandResult(2);
      } else {
        const formData = new FormData();
        formData.append('scriptFile', selectedFile, selectedFile.name);
        formData.append('studentIds', commandStudentList.length ? commandStudentList.map((e)=>nStudentList.filter(item=>item.studentName==e)[0].studentId) : nStudentList.map((student)=>{return student.studentId}));
        const result = await axios.post(
          `/v1/containers/courses/${courseId}/remote_script`, formData
        );
        console.log('원격스크립트 실행 성공 : ', result.data);
        setCommandResultList(result.data);
        setCommandResult(2);
      }
    } catch(err) {
      console.log('원격스크립트 실행 에러 : ', err);
    }
  }

  const handleNetworkPacket = () => {
    setNetworkPacketResult(2);
  }

  const handleFileSearch = async() => {
    try {
      const result = await axios.post(
        `/v1/containers/courses/${courseId}/file`, {
          "studentIds": fileSearchStudentList.length ? fileSearchStudentList.map((e)=>nStudentList.filter(item=>item.studentName==e)[0].studentId) : nStudentList.map((student)=>{return student.studentId}),
          "filePath": fileSearchDirectory
      }
      );
      console.log('파일탐색 성공 : ', result.data);
      setFileSearchResultList(result.data);
      setFileSearchResult(true);
    } catch(err) {
      console.log('파일탐색 에러 : ', err);
    }
  }

  const handleInstalledProgram = async() => {
    try {
      const result = await axios.post(
        `/v1/containers/courses/${courseId}/installation`, {
          "studentIds": installedProgramStudentList.length ? installedProgramStudentList.map((e)=>nStudentList.filter(item=>item.studentName==e)[0].studentId) : nStudentList.map((student)=>{return student.studentId}),
          "programName": installedProgramName
      }
      );
      console.log('설치프로그램 성공 : ', result.data);
      setInstalledProgramResultList(result.data);
      setInstalledProgramResult(true);
    } catch(err) {
      console.log('설치프로그램 에러 : ', err);
    }
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

  const handleBashHistoryExcludeKeyword = (value) => {
    const copyExclueKeywordList = bashHistoryExcludeKeywordList.slice();
    if (copyExclueKeywordList.findIndex((item)=>item==value)<0) {
      if (copyExclueKeywordList.length<5) copyExclueKeywordList.push(value); 
    }
    setBashHistoryExcludeKeywordList(copyExclueKeywordList);
  }

  const handleBashHistoryExcludeKeywordDelete = (value, index) => {
    const copyExclueKeywordList = bashHistoryExcludeKeywordList.slice();
    if (copyExclueKeywordList.findIndex((item)=>item==value)>=0) {
      copyExclueKeywordList.splice(index, 1);
      setBashHistoryExcludeKeywordList(copyExclueKeywordList)
    };
  }

  const handleStudentDelete = (value, index, left, setLeft, right, setRight, setChecked) => {
    const copyStudentList = right.slice();
    const copyNoneStudentList = left.slice();
    if (copyStudentList.findIndex((item)=>item==value)>=0) {
      copyStudentList.splice(index, 1);
      copyNoneStudentList.push(value);
      setRight(copyStudentList);
      setLeft(copyNoneStudentList);
      setChecked([]);
    };
  }

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

  const [quizSubmitList, setQuizSubmitList] = useState({});
  const [quizList, setQuizList] = useState([]);

  const handleQuizData = async() => {
    const result = await axios.get(`/v1/courses/${courseId}/assignments`);
    setMonitoringCategory('과제 및 실시간 퀴즈');
  }

  const handleInteractionData = async() => {

  }

  const ip = 'http://'+nClassDetail.containerIp;

  return (
    <S.Container>
      <List
        sx={{ width: '100%', color: "#9E9E9E" }}
        className={styles.sidebarList}
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
        {/* <ListItemButton onClick={handleVncDisconnect}>
          <ListItemText primary="컨테이너 중지" />
        </ListItemButton> */}

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
                studentActionList.map((student, index)=>{
                  console.log('테스트 중 : ',nStudentList);
                  console.log('테스트 중 : ',nStudentList.filter((item)=>item.studentId==student.studentId)[0]);
                  console.log('테스트 중 : ',nStudentList.filter((item)=>item.studentId==student.studentId)[0]?.studentName);
                  console.log('테스트 중 : ',nStudentList.filter((item)=>item.studentId==student.studentId)[0]?.containerIp);
                  return(
                    <Fragment>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`[학생 ${index+1}] ${nStudentList.filter((item)=>item.studentId==student.studentId)[0]?.studentName}`} />
                      {student.containerStatus=="RUNNING" ? <ListItemText><Button variant="contained" color='success' onClick={() => {handleVncConnect('http://'+nStudentList.filter((item)=>item.studentId==student.studentId)[0]?.containerIp)}}> 원격접속 </Button></ListItemText> : <ListItemText><Button variant="outlined" className={styles.impossibleButton} color='error' disabled>접속불가</Button></ListItemText>}
                      {student?.activity ? <ListItemText className={styles.mouseIcon}><MouseIcon color='primary' /></ListItemText> : <ListItemText className={styles.mouseIcon}><MouseIcon color='disabled' /></ListItemText>}
                      {/*studentDialogChecker[index] ? <ExpandLess onClick={()=>{handleStudentContainer(index)}} /> : <ExpandMore onClick={()=>{handleStudentContainer(index)}} />*/}
                    </ListItemButton>
                    {/* <Collapse in={studentDialogChecker[index]} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
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
                    </Collapse> */}
                    </Fragment>
                  )
                })
              }
            </List>
          </Collapse></>}

        {
        !isAdmin &&
        <Fragment>
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
        </Fragment>
        }

        {
          isAdmin &&
          <ListItemButton onClick={handleMonitoringModalOpen}>
          <ListItemText primary="모니터링" />
          <div className={styles.addIcon} ><AddIcon /></div>
          </ListItemButton>
        }

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
                <Grid className={monitoringCategory=='BASH 기록 확인' ? styles.monitoringSidebarButton_active : styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('BASH 기록 확인')}}>{/*<ManageSearchIcon className={styles.monitoringSidebarIcon_log}/>*/} BASH 기록 확인</Grid>
                <Grid className={monitoringCategory=='프로그램 설치 유무' ? styles.monitoringSidebarButton_active : styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('프로그램 설치 유무')}}>{/*<ManageSearchIcon className={styles.monitoringSidebarIcon_log}/>*/} 프로그램 설치 유무</Grid>
                <Grid className={monitoringCategory=='특정 파일내용 확인' ? styles.monitoringSidebarButton_active : styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('특정 파일내용 확인')}}>{/*<ManageSearchIcon className={styles.monitoringSidebarIcon_log}/>*/} 특정 파일내용 확인</Grid>
                {/* <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('네트워크 패킷')}}><SensorsIcon className={styles.monitoringSidebarIcon_network}/> 네트워크 패킷</Grid> */}
                <Grid className={monitoringCategory=='원격 명령 실행' ? styles.monitoringSidebarButton_active : styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('원격 명령 실행')}}>{/*<SettingsEthernetIcon className={styles.monitoringSidebarIcon_command}/>*/} 원격 명령 실행</Grid>
                {/* <Grid className={styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('스크립트 실행')}}><SettingsEthernetIcon className={styles.monitoringSidebarIcon_command}/> 스크립트 실행</Grid> */}
                {/* <Grid className={monitoringCategory=='과제 및 실시간 퀴즈' ? styles.monitoringSidebarButton_active : styles.monitoringSidebarButton} item xs={1} onClick={()=>{handleQuizData();}}>과제 및 실시간 퀴즈</Grid> */}
                {/* <Grid className={monitoringCategory=='O/X 체크' ? styles.monitoringSidebarButton_active : styles.monitoringSidebarButton} item xs={1} onClick={()=>{setMonitoringCategory('O/X 체크');handleInteractionData();}}>O/X 체크</Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={10} className={styles.monitoringModalItem}>
              <Typography className={styles.monitoringCategory} variant='h5'>{/*
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
                || installedProgramResult || fileSearchResult || commandResult
              */} {
                monitoringCategory=='BASH 기록 확인' ? bashHistoryResult ? <div><span className={styles.goBackIcon} onClick={()=>{setBashHistoryResult(false);}}>{'< '}</span>{monitoringCategory}</div> : <div>{monitoringCategory}</div> :
                monitoringCategory=='프로그램 설치 유무' ? installedProgramResult ? <div><span className={styles.goBackIcon} onClick={()=>{setInstalledProgramResult(false);}}>{'< '}</span>{monitoringCategory}</div> : <div>{monitoringCategory}</div> :
                monitoringCategory=='특정 파일내용 확인' ? fileSearchResult ? <div><span className={styles.goBackIcon} onClick={()=>{setFileSearchResult(false);}}>{'< '}</span>{monitoringCategory}</div> : <div>{monitoringCategory}</div> :
                monitoringCategory=='원격 명령 실행' ? commandResult ? <div><span className={styles.goBackIcon} onClick={()=>{setCommandResult(false);}}>{'< '}</span>{monitoringCategory}</div> : <div>{monitoringCategory}</div> :
                monitoringCategory=='원격 명령 실행' ? commandResult ? <div><span className={styles.goBackIcon} onClick={()=>{setCommandResult(false);}}>{'< '}</span>{monitoringCategory}</div> : <div>{monitoringCategory}</div> :
                monitoringCategory
            }</Typography>
              {
                monitoringCategory=='BASH 기록 확인' ?
                  bashHistoryResult ?
                  // #평가모듈 - BASH 기록 결과
                  <Fragment>
                  <Typography className={styles.monitoringSummary_result}>학생이 입력한 Bash 커맨드를 확인할 수 있습니다</Typography>
                  <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                    <Grid item xs={9} className={styles.monitoringResultHeaderSearch}>
                      결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setBashHistoryMoreResultKeyword(e.target.value)}} />
                      {` ( ${bashHistoryResultList.filter((item)=>(!item.fileContent && !bashHistoryMoreResultKeyword) || item.fileContent?.replaceAll('\n',' ')?.includes(bashHistoryMoreResultKeyword)).length} 명 / ${bashHistoryResultList.length} 명 )`}
                    </Grid>
                    {/* <Grid item xs={3} className={styles.monitoringResultHeaderButton}>
                      <div onClick={()=>{handleBashHistory}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                      <div onClick={()=>{setBashHistoryResult(false)}}>{`검색창 돌아가기`}</div>
                      <div onClick={()=>{setBashHistoryResultViewMode(bashHistoryResultViewMode==6 ? 12 : 6)}}>{`${bashHistoryResultViewMode==6 ? '1' : '2'}개씩 보기`}</div>
                    </Grid> */}
                    <div onClick={handleBashHistory} className={styles.reloadButton}>새로고침</div>
                    <div onClick={()=>{setBashHistoryResultViewMode(bashHistoryResultViewMode==6 ? 12 : 6)}} className={styles.viewModeButton}>{`${bashHistoryResultViewMode==6 ? '1' : '2'}개씩 보기`}</div>
                  </Grid>
                  <Grid container className={styles.monitoringResultBody} spacing={4}>
                    {
                      bashHistoryResultList.filter((item)=>(!item.fileContent && !bashHistoryMoreResultKeyword) || item.fileContent?.replaceAll('\n',' ')?.includes(bashHistoryMoreResultKeyword)).map((result, index)=>{
                        return(
                        <Grid item xs={bashHistoryResultViewMode}>
                          {/* <div container className={styles.monitoringResultItem}>
                            <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</Typography></div>
                            <div className={styles.resultItemBody}>
                              {
                                result.fileContent && result.fileContent.split('\n').map((line, index)=>{
                                  return (
                                    line && index%2==0 ? 
                                    <div className={styles.resultLine}>{`[${new Date(line).slice()}]`} <span className={styles.fontBolder}>{`${result.fileContent.split('\n')[index+1]}`}</span></div>
                                    : ''
                                  )
                                })
                              }
                            </div>
                          </div> */}
                          <Grid container className={bashHistoryExpandCheck[index] ? styles.monitoringResultItem : styles.monitoringResultItem_close}>
                            <Grid item xs={12} className={styles.resultItemTitle_v2}>
                              <div>{`[교육생] ${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</div>
                              <div className={styles.logExpandButton}>{bashHistoryExpandCheck[index] ? <ExpandLess onClick={()=>{
                                const copyExpandCheck = bashHistoryExpandCheck.slice();
                                copyExpandCheck[index] = false;
                                setBashHistoryExpandCheck(copyExpandCheck);
                              }} /> : <ExpandMore onClick={()=>{
                                const copyExpandCheck = bashHistoryExpandCheck.slice();
                                copyExpandCheck[index] = true;
                                setBashHistoryExpandCheck(copyExpandCheck);
                              }} />}</div>
                              <div className={styles.vncConnectButton} onClick={() => {handleVncConnect('http://'+nStudentList.filter((e)=>e.studentId==result.studentId)[0].containerIp);setMonitoringModalOpen(false);}}>원격접속</div>
                            </Grid>
                            {
                              bashHistoryExpandCheck[index] ?
                              <div className={styles.resultItemBody_v2}>
                              {
                                result.fileContent && result.fileContent.split('\n').map((line, index)=>{
                                  return (
                                    line && index%2==0 ? 
                                    <div className={styles.resultLine_v2}>{`[${line?.slice(11)}] `} <span className={styles.fontBolder}>{`${result.fileContent.split('\n')[index+1]}`}</span></div>
                                    : ''
                                  )
                                })
                              }
                            </div>
                            : ''
                            }
                          </Grid>
                        </Grid>
                        )
                      })
                    }
                  </Grid>
                  </Fragment>
                  :
                  // #평가모듈 - BASH 기록
                  <Grid container className={styles.monitoringBody} spacing={4}>
                    <Grid item xs={12} style={{paddingTop:'3px'}}>
                    <Typography className={styles.monitoringSummary}>학생이 입력한 Bash 커맨드를 확인할 수 있습니다</Typography>
                      <Grid container /*className={styles.monitoringItem}*/ justifyContent='center'>
                        {/* <Grid item xs={10} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'BASH 기록'}</Typography></Grid> */}
                        <Grid item xs={12}>
                          <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                            {/* <Grid item xs={11}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}><Button onClick={()=>{setBashHistoryLive(true)}} className={bashHistoryLive ? styles.bashHistoryButton : styles.bashHistoryButton_disabled} variant='contained' fullWidth={true}>실시간</Button></Grid>
                                <Grid item xs={6}><Button onClick={()=>{setBashHistoryLive(false)}} className={bashHistoryLive ? styles.bashHistoryButton_disabled : styles.bashHistoryButton} variant='contained' fullWidth={true}>비실시간</Button></Grid>
                              </Grid>
                            </Grid> */}
                            <Grid item xs={12}>
                              <Grid container className={styles.bashHistoryKeywordContainer} justifyContent={'flex-start'}>
                                <Grid item xs={12}><Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>제외 키워드</Typography></Grid>
                                <Typography className={styles.monitoringSummary}>검색에서 제외할 키워드를 입력하세요 (최대 5개)</Typography>
                                <Grid item xs={12} textAlign={'left'}>
                                {
                                  bashHistoryExcludeKeywordList.map((keyword, index)=>{
                                    return (
                                      <Chip className={styles.excludeKeywordListChip} label={keyword} onDelete={()=>handleBashHistoryExcludeKeywordDelete(keyword, index)} />
                                    )
                                  })
                                }
                                </Grid>
                                <Grid item xs={12} textAlign={'left'}><TextField className={styles.bashHistoryExcludeKeyword} size='small' onKeyPress={(e)=>{if(e.code=='Enter') handleBashHistoryExcludeKeyword(e.target.value)}} label="키워드를 입력하세요" variant="outlined" /></Grid>
                              </Grid>
                              <Grid container className={styles.bashHistoryStudentContainer}>
                                <Grid item xs={12}>
                                  <Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>조회 대상 학생 선택하기</Typography>
                                  <Typography className={styles.monitoringSummary}>위의 조건에 따라 로그를 수집할 학생들을 선택하세요</Typography>  
                                </Grid> {/* 별도의 선택이 없으면 전체 학생을 대상으로 검색됩니다. */}
                                {
                                  bashHistoryStudentList.map((student, index)=>{
                                    return (
                                      <Chip className={styles.studentListChip} label={student} onDelete={()=>handleStudentDelete(student, index, noneBashHistoryStudentList, setNoneBashHistoryStudentList, bashHistoryStudentList, setBashHistoryStudentList, setBashHistoryStudentChecked)} />
                                    )
                                  })
                                }
                                <Grid item xs={12} className={styles.bashHistoryStudentSelectItem}><Button className={styles.studentSelectButton} onClick={handleStudentListModalOpen} variant='contained'>선택하기</Button></Grid>
                              </Grid>
                              <Grid container justifyContent={'flex-start'}>
                                <Grid item xs={1} className={styles.bashHistorySearch}>
                                  <div className={styles.monitoringSearchButton} onClick={handleBashHistory}>검색</div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                : monitoringCategory=='프로그램 설치 유무' ?
                installedProgramResult ?
                // #평가모듈 - 설치 프로그램 결과
                <Fragment>
                <Typography className={styles.monitoringSummary_result}>설치 프로그램의 패키지명을 입력하면 학생별로 특정 프로그램이 설치 되었는지 확인할 수 있습니다</Typography>
                <br/><Typography>검색 프로그램명 : {installedProgramName}</Typography>
                {/* <Grid container className={styles.monitoringResultHeader} justifyContent={'flex-end'}>
                  <Grid item xs={2} className={styles.monitoringResultHeaderButton}>
                    <div onClick={()=>{handleInstalledProgram}} className={styles.monitoringResultHeaderButtonIcon}><CachedIcon/></div>
                    <div onClick={()=>{setInstalledProgramResult(false)}}>{`검색창 돌아가기`}</div>
                  </Grid>
                </Grid> */}
                <Grid container className={styles.successOrFailResultBody} spacing={4}>
                      <Grid item xs={6}>
                        <div className={styles.installedProgramVersionCheckBox}>
                          <div className={styles.installedProgramVersionCheck}>
                          <input placeholder='버전 검색하기' value={installedProgramSuccessVersionMoreSearch} onChange={(e)=>{setInstalledProgramSuccessVersionMoreSearch(e.target.value)}} className={styles.installedProgramVersionSearchInput} type='text' />
                          <Select className={styles.installedProgramUpdownSelect} value={installedProgramVersionUpdown} onChange={(e)=>setInstalledProgramVersionUpdown(e.target.value)}>
                            <MenuItem value={0}>이상</MenuItem>
                            <MenuItem value={1}>이하</MenuItem>
                          </Select>
                          </div>
                        </div>
                        <div container className={styles.successOrFailResultContainer_v2}>
                          <Grid item xs={12} className={styles.resultItemTitle_v2}>
                              <div>{`설치한 교육생 (${installedProgramResultList.filter((item)=>item.status).length}/${installedProgramResultList.length})`}</div>
                              <div className={styles.resultPercent}>{`${parseInt(installedProgramResultList.filter((item)=>item.status).length/installedProgramResultList.length*100)}% 일치`}</div>
                          </Grid>
                          <div className={styles.successOrFailItemBody}>
                            <Grid container>
                            {/* <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramSuccessStudentMoreSearch} onChange={(e)=>{setInstalledProgramSuccessStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={6}>설치경로<input value={installedProgramSuccessPathMoreSearch} onChange={(e)=>{setInstalledProgramSuccessPathMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>버전<input value={installedProgramSuccessVersionMoreSearch} onChange={(e)=>{setInstalledProgramSuccessVersionMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid> */}
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명</Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={6}>설치경로</Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>버전</Grid>
                            {
                              installedProgramResultList.filter((item, index)=>{
                                return item.status && (`${nStudentList.filter((e)=>e.studentId==item.studentId)[0].studentName}`).includes(installedProgramSuccessStudentMoreSearch) && (item.installPath==null || item.installPath.includes(installedProgramSuccessPathMoreSearch)) && (item.version==null || installedProgramVersionUpdown ? item.version<installedProgramSuccessVersionMoreSearch : item.version>=installedProgramSuccessVersionMoreSearch)
                              }).map((student, index)=>{
                                return(
                                  <Fragment>
                                    <Grid item xs={3} className={styles.successLine}>{`${nStudentList.filter((e)=>e.studentId==student.studentId)[0].studentName}`}</Grid>
                                    <Grid item xs={6} className={styles.successLine}><div>{student.installPath}</div></Grid>
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
                        <div className={styles.installedProgramVersionCheckBox}></div>
                        <div container className={styles.successOrFailResultContainer_v2}>
                          <Grid item xs={12} className={styles.resultItemTitle_v2}>
                              <div>{`설치하지 않은 교육생 (${installedProgramResultList.filter((item)=>!item.status).length}/${installedProgramResultList.length})`}</div>
                              {/* <div className={styles.resultPercent}>{`${parseInt(installedProgramResultList.filter((item)=>!item.status).length/installedProgramResultList.length*100)}% 일치`}</div> */}
                          </Grid>
                          <div className={styles.successOrFailItemBody}>
                            <Grid container>
                            {/* <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramFailStudentMoreSearch} onChange={(e)=>{setInstalledProgramFailStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={9}>원격 접속<div className={styles.DdemBbangMessage}># 버튼 클릭하여 학생 컨테이너로 이동</div></Grid> */}
                            <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명</Grid>
                            <Grid item className={styles.successOrFailTableTitle} xs={9}><div className={styles.DdemBbangMessage}># 버튼 클릭하여 학생 컨테이너로 이동</div></Grid>
                            {
                              installedProgramResultList.filter((item, index)=>{
                                return !item.status && (`${nStudentList.filter((e)=>e.studentId==item.studentId)[0].studentName}`).includes(installedProgramFailStudentMoreSearch) 
                              }).map((student, index)=>{
                                return(
                                  <Fragment>
                                    <Grid item xs={3} className={styles.failLine}>{`${nStudentList.filter((e)=>e.studentId==student.studentId)[0].studentName}`}</Grid>
                                    <Grid item xs={9} className={styles.failLine}><Button onClick={() => handleVncConnect(`http://${nStudentList.filter((e)=>e.studentId==student.studentId)[0].containerIp}`)} className={styles.DdemBbangButton}>원격 접속</Button></Grid>
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
                  <Grid item xs={12} style={{paddingTop:'3px'}}>
                  <Typography className={styles.monitoringSummary}>설치 프로그램의 패키지명을 입력하면 학생별로 특정 프로그램이 설치 되었는지 확인할 수 있습니다</Typography>
                  <br/>
                    <Grid container /*className={styles.monitoringItem}*/ justifyContent='center'>
                      {/* <Grid item xs={12} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'설치 프로그램'}</Typography></Grid> */}
                      <Grid item xs={12}>
                        <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                          <Grid item xs={12}>
                            {/* <Grid container spacing={2} className={styles.installedProgramTypeContainer}>
                              <Grid item xs={12}><Typography className={styles.bashHistoryPeriodTitle}>설치방식</Typography></Grid>
                              <Grid item xs={6}><Button onClick={()=>{setInstalledProgramType(0)}} className={installedProgramType==0 ? styles.bashHistoryButton : styles.bashHistoryButton_disabled} variant='contained' fullWidth={true}>패키지</Button></Grid>
                              <Grid item xs={6}><Button onClick={()=>{setInstalledProgramType(1)}} className={installedProgramType==0 ? styles.bashHistoryButton_disabled : styles.bashHistoryButton} variant='contained' fullWidth={true}>다운로드 받은 설치파일</Button></Grid>
                            </Grid> */}
                            <Grid container justifyContent={'flex-start'}>
                                <Grid item xs={12}><Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>프로그램명</Typography></Grid>
                                <Typography className={styles.monitoringSummary}>설치 유무를 확인할 프로그램명을 입력하세요</Typography>
                                <Grid item xs={12} textAlign={'left'}><TextField className={styles.bashHistoryExcludeKeyword} size='small' onChange={(e)=>{setInstalledProgramName(e.target.value)}} label="프로그램명을 입력하세요" variant="outlined" /></Grid>
                            </Grid>
                            <Grid container className={styles.bashHistoryStudentContainer}>
                                <Grid item xs={12}>
                                  <Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>조회 대상 학생 선택하기</Typography>
                                  <Typography className={styles.monitoringSummary}>위의 조건에 따라 로그를 수집할 학생들을 선택하세요</Typography>  
                                </Grid> {/* 별도의 선택이 없으면 전체 학생을 대상으로 검색됩니다. */}
                                {
                                  installedProgramStudentList.map((student, index)=>{
                                    return (
                                      <Chip className={styles.studentListChip} label={student} onDelete={()=>handleStudentDelete(student, index, noneInstalledProgramStudentList, setNoneInstalledProgramStudentList, installedProgramStudentList, setInstalledProgramStudentList, setInstalledProgramStudentChecked)} />
                                    )
                                  })
                                }
                                <Grid item xs={12} className={styles.bashHistoryStudentSelectItem}><Button className={styles.studentSelectButton} onClick={()=>{setInstalledProgramDialogOpen(true)}} variant='contained'>선택하기</Button></Grid>
                            </Grid>
                            <Grid container justifyContent={'flex-start'}>
                                <Grid item xs={1} className={styles.bashHistorySearch}>
                                  <div className={styles.monitoringSearchButton} onClick={handleInstalledProgram}>검색</div>
                                </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                : monitoringCategory=='특정 파일내용 확인' ?
                fileSearchResult ?
                // #평가모듈 - 파일 탐색 결과
                <Fragment>
                  <Typography className={styles.monitoringSummary_result}>학생들의 컨테이너 내부에 존재하는 특정 파일의 내용을 확인할 수 있습니다</Typography>
                  <br/><Typography fontWeight={700}>확인 파일 : {fileSearchDirectory}</Typography>
                  <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                    <Grid item xs={6} className={styles.monitoringResultHeaderSearch_v2}>
                      결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setFileSearchMoreResultKeyword(e.target.value)}} />
                    </Grid>
                    <Grid item xs={2}>
                      <div onClick={()=>{setFileSearchExpandCheck(Array.from({length: fileSearchResultList.length}, ()=>true))}} className={styles.totalOpenButton}>전체열기</div>
                      <div onClick={()=>{setFileSearchExpandCheck(Array.from({length: fileSearchResultList.length}, ()=>false))}} className={styles.totalCloseButton}>전체닫기</div>
                    </Grid>
                  </Grid>
                  <Grid container className={styles.monitoringResultBody_v2} spacing={4}>
                    <Grid item xs={6} className={styles.fileSearchConditionTitleItem}>
                    <div className={styles.fileSearchConditionTitle}>조건 충족 {` ( ${fileSearchResultList.filter((item)=>(!item.fileContent && !fileSearchMoreResultKeyword) || item.fileContent?.replaceAll('\n',' ')?.includes(fileSearchMoreResultKeyword))?.length} / ${fileSearchResultList.length} 명 )`}</div>
                    <div className={styles.fileSearchConditionPercent}>{`${parseInt(fileSearchResultList.filter((item)=>(!item.fileContent && !fileSearchMoreResultKeyword) || item.fileContent?.replaceAll('\n',' ')?.includes(fileSearchMoreResultKeyword))?.length/fileSearchResultList.length)*100}%`}</div>
                    <div className={styles.fileSearchConditionBox}>
                    {
                      fileSearchResultList.filter((item)=>(!item.fileContent && !fileSearchMoreResultKeyword) || item.fileContent?.replaceAll('\n',' ')?.includes(fileSearchMoreResultKeyword)).map((result, index)=>{
                        return(
                        <Fragment>
                        <Grid item xs={12}>
                        <Grid container className={fileSearchExpandCheck[index] ? styles.monitoringResultItem : styles.monitoringResultItem_close}>
                          <Grid item xs={12} className={styles.resultItemTitle_v2}>
                            <div>{`[교육생] ${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</div>
                            <div className={styles.logExpandButton}>{fileSearchExpandCheck[index] ? <ExpandLess onClick={()=>{
                              const copyExpandCheck = fileSearchExpandCheck.slice();
                              copyExpandCheck[index] = false;
                              setFileSearchExpandCheck(copyExpandCheck);
                            }} /> : <ExpandMore onClick={()=>{
                              const copyExpandCheck = fileSearchExpandCheck.slice();
                              copyExpandCheck[index] = true;
                              setFileSearchExpandCheck(copyExpandCheck);
                            }} />}</div>
                            <div className={styles.vncConnectButton} onClick={() => {handleVncConnect('http://'+nStudentList.filter((e)=>e.studentId==result.studentId)[0].containerIp);setMonitoringModalOpen(false);}}>원격접속</div>
                          </Grid>
                          {
                            fileSearchExpandCheck[index] ?
                            <div className={styles.resultItemBody_v2}>
                            {
                              result.fileContent && result.fileContent.split('\n').map((line, index)=>{
                                return (
                                  index+1!=result.fileContent.split('\n').length ? 
                                  <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{`${line}`}</span></div>
                                  : ''
                                )
                              })
                            }
                          </div>
                          : ''
                          }
                        </Grid>
                        </Grid>
                        </Fragment>
                        )
                      })
                    }
                    </div>
                    </Grid>
                    <Grid item xs={6} className={styles.fileSearchConditionTitleItem}>
                    <div className={styles.fileSearchConditionTitle}>조건 미충족 {` ( ${fileSearchResultList.filter((item)=>(fileSearchMoreResultKeyword && !item.fileContent?.replaceAll('\n',' ')?.includes(fileSearchMoreResultKeyword)))?.length} / ${fileSearchResultList.length} 명 )`}</div>
                    <div className={styles.fileSearchConditionPercent}>{`${parseInt(fileSearchResultList.filter((item)=>(fileSearchMoreResultKeyword && !item.fileContent?.replaceAll('\n',' ')?.includes(fileSearchMoreResultKeyword)))?.length/fileSearchResultList.length*100)}%`}</div>
                    <div className={styles.fileSearchConditionBox}>
                    {
                      fileSearchResultList.filter((item)=>(fileSearchMoreResultKeyword && !item.fileContent?.replaceAll('\n',' ')?.includes(fileSearchMoreResultKeyword))).map((result, index)=>{
                        return(
                        <Fragment>
                        <Grid item xs={12}>
                        <Grid container className={fileSearchExpandCheck[index] ? styles.monitoringResultItem : styles.monitoringResultItem_close}>
                          <Grid item xs={12} className={styles.resultItemTitle_v2}>
                            <div>{`[교육생] ${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</div>
                            <div className={styles.logExpandButton}>{fileSearchExpandCheck[index] ? <ExpandLess onClick={()=>{
                              const copyExpandCheck = fileSearchExpandCheck.slice();
                              copyExpandCheck[index] = false;
                              setFileSearchExpandCheck(copyExpandCheck);
                            }} /> : <ExpandMore onClick={()=>{
                              const copyExpandCheck = fileSearchExpandCheck.slice();
                              copyExpandCheck[index] = true;
                              setFileSearchExpandCheck(copyExpandCheck);
                            }} />}</div>
                            <div className={styles.vncConnectButton} onClick={() => {handleVncConnect('http://'+nStudentList.filter((e)=>e.studentId==result.studentId)[0].containerIp);setMonitoringModalOpen(false);}}>원격접속</div>
                          </Grid>
                          {
                            fileSearchExpandCheck[index] ?
                            <div className={styles.resultItemBody_v2}>
                            {
                              result.fileContent && result.fileContent.split('\n').map((line, index)=>{
                                return (
                                  index+1!=result.fileContent.split('\n').length ? 
                                  <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{`${line}`}</span></div>
                                  : ''
                                )
                              })
                            }
                          </div>
                          : ''
                          }
                        </Grid>
                        </Grid>
                        </Fragment>
                        )
                      })
                    }
                    </div>
                    </Grid>
                  </Grid>
                </Fragment>
                :
                // #평가모듈 - 파일 탐색
                <Grid container className={styles.monitoringBody} spacing={4}>
                  <Grid item xs={12} style={{paddingTop:'3px'}}>
                  <Typography className={styles.monitoringSummary}>학생들의 컨테이너 내부에 존재하는 특정 파일의 내용을 확인할 수 있습니다</Typography>
                  <br/>
                    <Grid container /*className={styles.monitoringItem}*/ justifyContent='center'>
                      {/* <Grid item xs={12} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'파일 탐색'}</Typography></Grid> */}
                      <Grid item xs={12}>
                        <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                          <Grid item xs={12}>
                            <Grid container justifyContent={'flex-start'}>
                                <Grid item xs={12}><Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>파일명</Typography></Grid>
                                <Typography className={styles.monitoringSummary}>경로를 포함한 파일명을 입력해주세요</Typography>
                                <Grid item xs={12} textAlign={'left'}><TextField className={styles.bashHistoryExcludeKeyword} size='small' onChange={(e)=>{setFileSearchDirectory(e.target.value)}} label="파일명을 입력하세요" variant="outlined" /></Grid>
                            </Grid>
                            <Grid container justifyContent={'flex-start'}>
                                <Grid item xs={12}><Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>파일주입</Typography></Grid>
                                <Grid item xs={12} textAlign={'left'} className={styles.positionRelative}>
                                  <Typography className={styles.monitoringSummary}>파일이 이미 존재할 경우 해당파일을 덮어쓸 것인지 체크해주세요</Typography>
                                  <input className={styles.fileUpload} type='file' onChange={(e)=>{handleFilePush(e)}} />
                                  <FormGroup className={styles.switchButton}>
                                    <FormControlLabel control={<Switch defaultChecked checked={insertOption==0} onChange={()=>{setInsertOption(insertOption ? 0 : 1)}} />} label="덮어쓰기 허용여부" labelPlacement='start' />
                                  </FormGroup>
                                </Grid>
                                <Grid item xs={12} textAlign={'left'} >
                                  <TextField className={styles.uploadDirectoryInput} size='small' onChange={(e)=>{setFileSearchDirectory(e.target.value)}} label="학생들에게 업로드할 파일경로를 입력하세요" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} textAlign={'left'} className={styles.bashHistoryStudentSelectItem}><Button className={styles.studentSelectButton} onClick={()=>{handleFileFile()}} variant='contained'>업로드</Button></Grid>
                            </Grid>
                            <Grid container className={styles.bashHistoryStudentContainer}>
                                <Grid item xs={12}>
                                  <Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>조회 대상 학생 선택하기</Typography>
                                  <Typography className={styles.monitoringSummary}>위의 조건에 따라 로그를 수집할 학생들을 선택하세요</Typography>  
                                </Grid> {/* 별도의 선택이 없으면 전체 학생을 대상으로 검색됩니다. */}
                                {
                                  fileSearchStudentList.map((student, index)=>{
                                    return (
                                      <Chip className={styles.studentListChip} label={student} onDelete={()=>handleStudentDelete(student, index, noneFileSearchStudentList, setNoneFileSearchStudentList, fileSearchStudentList, setFileSearchStudentList, setFileSearchStudentChecked)} />
                                    )
                                  })
                                }
                                <Grid item xs={12} className={styles.bashHistoryStudentSelectItem}><Button className={styles.studentSelectButton} onClick={()=>{setFileSearchDialogOpen(true)}} variant='contained'>선택하기</Button></Grid>
                            </Grid>
                            <Grid container justifyContent={'flex-start'}>
                                <Grid item xs={1} className={styles.bashHistorySearch}>
                                  <div className={styles.monitoringSearchButton} onClick={handleFileSearch}>검색</div>
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
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</Typography></div>
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
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`설치 명단 (${installedProgramResultList.filter((item)=>item.status).length}/${installedProgramResultList.length})`}</Typography></div>
                              <div className={styles.successOrFailItemBody}>
                                <Grid container>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramSuccessStudentMoreSearch} onChange={(e)=>{setInstalledProgramSuccessStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={6}>설치경로<input value={installedProgramSuccessPathMoreSearch} onChange={(e)=>{setInstalledProgramSuccessPathMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>버전<input value={installedProgramSuccessVersionMoreSearch} onChange={(e)=>{setInstalledProgramSuccessVersionMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                {
                                  installedProgramResultList.filter((item, index)=>{
                                    return item.status && (`${nStudentList.filter((e)=>e.studentId==item.studentId)[0].studentName}`).includes(installedProgramSuccessStudentMoreSearch) && item.installPath.includes(installedProgramSuccessPathMoreSearch) && item.version.includes(installedProgramSuccessVersionMoreSearch)
                                  }).map((student, index)=>{
                                    return(
                                      <Fragment>
                                        <Grid item xs={3} className={styles.successLine}>{`${nStudentList.filter((e)=>e.studentId==student.studentId)[0].studentName}`}</Grid>
                                        <Grid item xs={6} className={styles.successLine}><div>{student.installPath}</div></Grid>
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
                              <div className={styles.resultItemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{`미설치 명단 (${installedProgramResultList.filter((item)=>!item.status).length}/${installedProgramResultList.length})`}</Typography></div>
                              <div className={styles.successOrFailItemBody}>
                                <Grid container>
                                <Grid item className={styles.successOrFailTableTitle} xs={3}>학생명<input value={installedProgramFailStudentMoreSearch} onChange={(e)=>{setInstalledProgramFailStudentMoreSearch(e.target.value)}} className={styles.successOrFailMoreSearchInput} type='text' /></Grid>
                                <Grid item className={styles.successOrFailTableTitle} xs={9}>원격 접속<div className={styles.DdemBbangMessage}># 버튼 클릭하여 학생 컨테이너로 이동</div></Grid>
                                {
                                  installedProgramResultList.filter((item, index)=>{
                                    return !item.status && (`${nStudentList.filter((e)=>e.studentId==item.studentId)[0].studentName}`).includes(installedProgramFailStudentMoreSearch) && item.installPath.includes(installedProgramFailPathMoreSearch) && item.version.includes(installedProgramFailVersionMoreSearch)
                                  }).map((student, index)=>{
                                    return(
                                      <Fragment>
                                        <Grid item xs={3} className={styles.failLine}>{`${nStudentList.filter((e)=>e.studentId==student.studentId)[0].studentName}`}</Grid>
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
                : monitoringCategory=='원격 명령 실행' ?
                commandResult==2 || commandResult==3 ?
                  // #평가모듈 - 명령어 실행 결과
                  <Fragment>
                  <Typography className={styles.monitoringSummary_result}>학생들의 컨테이너 내부에 특정 명령을 원격으로 실행할 수 있습니다</Typography>
                  <br/><Typography fontWeight={700}>실행 명령어 : {commandString}</Typography>
                  <Grid container className={styles.monitoringResultHeader} justifyContent={'space-between'}>
                    <Grid item xs={6} className={styles.monitoringResultHeaderSearch_v2}>
                      결과 내 검색 <input className={styles.bashHistoryMoreSearchInput} type='text' onChange={(e)=>{setCommandMoreSearch(e.target.value)}} />
                    </Grid>
                    <Grid item xs={2}>
                      <div onClick={()=>{setCommandExpandCheck(Array.from({length: commandResultList.length}, ()=>true))}} className={styles.totalOpenButton}>전체열기</div>
                      <div onClick={()=>{setCommandExpandCheck(Array.from({length: commandResultList.length}, ()=>false))}} className={styles.totalCloseButton}>전체닫기</div>
                    </Grid>
                  </Grid>
                  <Grid container className={styles.monitoringResultBody_v2} spacing={4}>
                    <Grid item xs={6} className={styles.fileSearchConditionTitleItem}>
                    <div className={styles.fileSearchConditionTitle}>조건 충족 {` ( ${commandResultList.filter((item)=>(!item.commandResult && !commandMoreSearch) || item.commandResult?.replaceAll('\n',' ')?.includes(commandMoreSearch))?.length} / ${commandResultList.length} 명 )`}</div>
                    <div className={styles.fileSearchConditionPercent}>{`${parseInt(commandResultList.filter((item)=>(!item.commandResult && !commandMoreSearch) || item.commandResult?.replaceAll('\n',' ')?.includes(commandMoreSearch))?.length/commandResultList.length*100)}%`}</div>
                    <div className={styles.fileSearchConditionBox}>
                    {
                      commandResultList.filter((item)=>(!item.commandResult && !commandMoreSearch) || item.commandResult?.replaceAll('\n',' ')?.includes(commandMoreSearch)).map((result, index)=>{
                        return(
                        <Fragment>
                          <Grid item xs={12}>
                          <Grid container className={commandExpandCheck[index] ? styles.monitoringResultItem : styles.monitoringResultItem_close}>
                            <Grid item xs={12} className={styles.resultItemTitle_v2}>
                              <div>{`[교육생] ${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</div>
                              <div className={styles.logExpandButton}>{commandExpandCheck[index] ? <ExpandLess onClick={()=>{
                                const copyExpandCheck = commandExpandCheck.slice();
                                copyExpandCheck[index] = false;
                                setCommandExpandCheck(copyExpandCheck);
                              }} /> : <ExpandMore onClick={()=>{
                                const copyExpandCheck = commandExpandCheck.slice();
                                copyExpandCheck[index] = true;
                                setCommandExpandCheck(copyExpandCheck);
                              }} />}</div>
                              <div className={styles.vncConnectButton} onClick={() => {handleVncConnect('http://'+nStudentList.filter((e)=>e.studentId==result.studentId)[0].containerIp);setMonitoringModalOpen(false);}}>원격접속</div>
                            </Grid>
                            {
                              commandExpandCheck[index] ?
                              <div className={styles.resultItemBody_v2}>
                              {
                                result.commandResult && result.commandResult.split('\n').map((line, index)=>{
                                  console.log(line);
                                  return (
                                    index+1!=result.commandResult.split('\n').length ? 
                                    <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{line}</span></div>
                                    : ''
                                  )
                                })
                              }
                            </div>
                            : ''
                            }
                          </Grid>
                          </Grid>
                          </Fragment>
                          )
                        })
                      }
                      </div>
                      </Grid>
                      <Grid item xs={6} className={styles.fileSearchConditionTitleItem}>
                      <div className={styles.fileSearchConditionTitle}>조건 미충족 {` ( ${commandResultList.filter((item)=>(commandMoreSearch && !item.commandResult?.replaceAll('\n',' ')?.includes(commandMoreSearch)))?.length} / ${commandResultList.length} 명 )`}</div>
                      <div className={styles.fileSearchConditionPercent}>{`${parseInt(commandResultList.filter((item)=>commandMoreSearch && !item.commandResult?.replaceAll('\n',' ')?.includes(commandMoreSearch))?.length/commandResultList.length*100)}%`}</div>
                      <div className={styles.fileSearchConditionBox}>
                      {
                        commandResultList.filter((item)=>(commandMoreSearch && !item.commandResult?.replaceAll('\n',' ')?.includes(commandMoreSearch))).map((result, index)=>{
                          return(
                          <Fragment>
                          <Grid item xs={12}>
                          <Grid container className={commandExpandCheck[index] ? styles.monitoringResultItem : styles.monitoringResultItem_close}>
                            <Grid item xs={12} className={styles.resultItemTitle_v2}>
                              <div>{`[교육생] ${nStudentList.filter((e)=>e.studentId==result.studentId)[0].studentName}`}</div>
                              <div className={styles.logExpandButton}>{commandExpandCheck[index] ? <ExpandLess onClick={()=>{
                                const copyExpandCheck = commandExpandCheck.slice();
                                copyExpandCheck[index] = false;
                                setCommandExpandCheck(copyExpandCheck);
                              }} /> : <ExpandMore onClick={()=>{
                                const copyExpandCheck = commandExpandCheck.slice();
                                copyExpandCheck[index] = true;
                                setCommandExpandCheck(copyExpandCheck);
                              }} />}</div>
                              <div className={styles.vncConnectButton} onClick={() => {handleVncConnect('http://'+nStudentList.filter((e)=>e.studentId==result.studentId)[0].containerIp);setMonitoringModalOpen(false);}}>원격접속</div>
                            </Grid>
                            {
                              commandExpandCheck[index] ?
                              <div className={styles.resultItemBody_v2}>
                              {
                                result.commandResult && result.commandResult.split('\n').map((line, index)=>{
                                  return (
                                    index+1!=result.commandResult.split('\n').length ? 
                                    <div className={styles.resultLine}>{`${index+1}`} <span className={styles.fontBolder}>{`${line}`}</span></div>
                                    : ''
                                  )
                                })
                              }
                            </div>
                            : ''
                            }
                          </Grid>
                          </Grid>
                          </Fragment>
                          )
                        })
                      }
                      </div>
                      </Grid>
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
                    <Grid item xs={12} style={{paddingTop:'3px'}}>
                    <Typography className={styles.monitoringSummary}>학생들의 컨테이너 내부에 특정 명령을 원격으로 실행할 수 있습니다</Typography>
                    <br/>
                      <Grid container /*className={styles.monitoringItem}*/ justifyContent='center'>
                        {/* <Grid item xs={12} className={styles.itemTitle}><Typography className={styles.monitoringItemTitle} textAlign='center' variant='h6'>{'파일 탐색'}</Typography></Grid> */}
                        <Grid item xs={12}>
                          <Grid container className={styles.bashHistoryContainer} justifyContent={'center'}>
                            <Grid item xs={12}>
                              <Grid container justifyContent={'flex-start'}>
                                  <Grid item xs={12}><Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>명령어</Typography></Grid>
                                  <Typography className={styles.monitoringSummary}>학생 컨테이너에서 실행할 명령어를 입력해주세요</Typography>
                                  <Grid item xs={12} textAlign={'left'}><input className={styles.fileUpload} type='file' onChange={(e)=>{handleFileUpload(e)}} /></Grid>
                                  <Grid item xs={12} textAlign={'left'}><TextField className={styles.bashHistoryExcludeKeyword} size='small' onChange={(e)=>{setCommandString(e.target.value)}} label="명령어를 입력하세요" variant="outlined" /></Grid>
                              </Grid>
                              <Grid container className={styles.bashHistoryStudentContainer}>
                                  <Grid item xs={12}>
                                    <Typography className={styles.designedMonitoringBoyTitle/*styles.bashHistoryPeriodTitle*/}>적용 대상 학생 선택하기</Typography>
                                    <Typography className={styles.monitoringSummary}>원격 명령을 실행할 학생들을 선택하세요</Typography>  
                                  </Grid> {/* 별도의 선택이 없으면 전체 학생을 대상으로 검색됩니다. */}
                                  {
                                    commandStudentList.map((student, index)=>{
                                      return (
                                        <Chip className={styles.studentListChip} label={student} onDelete={()=>handleStudentDelete(student, index, noneCommandStudentList, setNoneCommandStudentList, commandStudentList, setCommandStudentList, setCommandStudentChecked)} />
                                      )
                                    })
                                  }
                                  <Grid item xs={12} className={styles.bashHistoryStudentSelectItem}><Button className={styles.studentSelectButton} onClick={()=>{setCommandDialogOpen(true)}} variant='contained'>선택하기</Button></Grid>
                              </Grid>
                              <Grid container justifyContent={'flex-start'}>
                                  <Grid item xs={1} className={styles.bashHistorySearch}>
                                    <div className={styles.monitoringSearchButton} onClick={handleCommand}>검색</div>
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
                    <Grid item xs={12} style={{paddingTop:'3px'}}>
                      <Typography className={styles.monitoringSummary}>과제 및 실시간 퀴즈의 제출현황을 확인할 수 있습니다</Typography>
                      <br/>
                      <div className={styles.createQuiz}><a target='_blank' href={`/assignment/class/${router.query.id}?quizCreate=true`}>퀴즈 생성</a></div>
                      <div className={styles.monitoringBody_quiz}>
                        <Grid container justifyContent='flex-start'>
                          <Grid className={styles.quizResultTable} item xs={1}></Grid>
                          {
                            quizList.length && 
                            quizList.map((q)=>{
                              return (
                                <Grid item xs={2} className={styles.quizResultTable}>
                                  <Typography className={`${styles.oneLineLimit} ${styles.questionResultTitle}`}>{q.question}</Typography>
                                  <Grid container>
                                    <Grid item xs={6}>
                                      <Typography className={styles.oneLineLimit}>참여율</Typography>
                                      <Typography className={`${styles.oneLineLimit} ${styles.questionResultPercent}`}>{`${parseInt(Object.keys(quizSubmitList).filter((item)=>Object.keys(q.students).includes(item)).length/Object.keys(quizSubmitList).length*100)}%`}</Typography>
                                      <Typography className={`${styles.oneLineLimit} ${styles.questionResultPeople}`}>{`(${Object.keys(quizSubmitList).filter((item)=>Object.keys(q.students).includes(item)).length}/${Object.keys(quizSubmitList).length}명)`}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography className={styles.oneLineLimit}>정답율</Typography>
                                      <Typography className={`${styles.oneLineLimit} ${styles.questionResultPercent}`}>{`${parseInt(Object.keys(quizSubmitList).filter((item)=>Object.keys(q.students).includes(item) && q.students[item].score>0).length/Object.keys(quizSubmitList).length*100)}%`}</Typography>
                                      <Typography className={`${styles.oneLineLimit} ${styles.questionResultPeople}`}>{`(${Object.keys(quizSubmitList).filter((item)=>Object.keys(q.students).includes(item) && q.students[item].score>0).length}/${Object.keys(quizSubmitList).length}명)`}</Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )
                            })
                          }
                        </Grid>
                        <Grid container justifyContent='flex-start'>
                          <Grid className={styles.quizResultTable} item xs={1}></Grid>
                          {
                            quizList.length && 
                            quizList.map((q,index)=>{
                              return (
                                <Grid item xs={2} className={styles.quizResultTable}>
                                  <div className={styles.alignQuiz}>정렬</div>
                                  <Select className={styles.installedProgramUpdownSelect} value={quizStandard==q.question ? quizOrder : 0} onChange={(e)=>handleQuizOrder(e.target.value, q.question)}>
                                    <MenuItem value={0}>정답순</MenuItem>
                                    <MenuItem value={1}>오답순</MenuItem>
                                    <MenuItem value={2}>미제출순</MenuItem>
                                  </Select>
                                </Grid>
                              )
                            })
                          }
                        </Grid>
                        {
                          Object.keys(quizSubmitList).length >= 1 &&
                          Object.keys(quizSubmitList).map((nkey, index)=>{
                          const correctList = Object.keys(quizSubmitList).filter((nkey)=>quizSubmitList[nkey][quizStandard]?.score==1);
                          const wrongList = Object.keys(quizSubmitList).filter((nkey)=>quizSubmitList[nkey][quizStandard]?.score==0);
                          const unknownList = Object.keys(quizSubmitList).filter((nkey)=>!quizSubmitList[nkey][quizStandard]); 
                          console.log(quizStandard);
                          console.log(correctList.concat(wrongList.concat(unknownList)), wrongList.concat(correctList.concat(unknownList)), unknownList.concat(correctList.concat(wrongList)));
                          return(
                            quizOrder==0 ?
                            correctList.concat(wrongList.concat(unknownList))
                            : quizOrder==1 ?
                            wrongList.concat(correctList.concat(unknownList))
                            :
                            unknownList.concat(correctList.concat(wrongList))
                          )}).map((key)=>{
                            return (
                              <Grid container className={styles.quizResultTableBodyContainer} justifyContent='flex-start'>
                                {quizSubmitList[key]+'2'}
                                <Grid item className={styles.noAnswer} xs={1}>{nStudentList.filter((s)=>s.studentId==key)[0]?.studentName}</Grid>
                                {
                                  quizSubmitList[key] && quizList.map((q)=>{
                                    console.log('key q : ',key,q);
                                    return (
                                      Object.keys(quizSubmitList[key]).includes(q.question) ?
                                      <Grid item xs={2} className={quizSubmitList[key][q.question].score>0 ? styles.correctAnswer : styles.wrongAnswer}>{quizSubmitList[key][q.question].submit}</Grid>
                                      :
                                      <Grid item xs={2} className={styles.noAnswer}>{''}</Grid>
                                    )
                                  })
                                }
                              </Grid>
                            )
                          })
                        }
                      </div>
                    </Grid>
                  </Grid>
                : monitoringCategory=='O/X 체크' ?
                  <Grid container className={styles.monitoringBody}>
                    <Grid item xs={12} style={{paddingTop:'3px'}}>
                      <Typography className={styles.monitoringSummary}>O/X 체크를 통해 학생들의 이해도를 파악할 수 있습니다</Typography>
                      <br/>
                      <Grid container justifyContent='center'>
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