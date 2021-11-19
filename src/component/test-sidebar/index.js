import { useState, useEffect, useRef, Fragment } from 'react'
import { useRouter } from 'next/router';
import * as S from "./styles";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CircularProgress from "@mui/material/CircularProgress";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from "@mui/material/TextField";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SuccessAlert from '../SuccessAlert';
import FailureAlert from '../FailureAlert';
import axios from 'axios';



const TestSidebar = ({ isAdmin, handleVncConnect, handleVncDisconnect, nMe, nEvaluationDetail, nQuizList }) => {
  console.log('nQuizList : ', nQuizList);
  const router = useRouter();
  const [quizChecker, setQuizChecker] = useState(Array.from({length: nQuizList.length}, ()=>false));
  const [answer, setAnswer] = useState(Array.from({length: nQuizList.length}, ()=>''));
  const [q1SendAnswer, setQ1SendAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = nMe?.id;
  const evaluationId = router.query.id;

  const handleAnswer = async(quizId, index) => {
    try {
      await axios.post(`/v1/users/${userId}/evaluations/${evaluationId}/quizzes/${quizId}`, {
        'answer': answer[index]
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

  const changeAnswer = (value, index) => {
    const copyAnswer = answer.slice();
    copyAnswer[index] = value;
    setAnswer(copyAnswer);
  }

  const handleQuizChecker = (index) =>{
    const copyChecker = quizChecker.slice();
    copyChecker[index] = !quizChecker[index];
    setQuizChecker(copyChecker);
  }

  const callback = () => {
    setQ1SendAnswer(true);
    setLoading(false);
  }
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(callback, 2000);
  };

  const [min, setMin] = useState(59);
  const [sec, setSec] = useState(59);
  const time = useRef(3598);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  return (
    <S.Container>
      <List
        sx={{ width: '100%', color: "#9E9E9E" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ background: "#2E3336", color: "#9e9e9e", fontSize: "1.2rem", margin: "15px" }}>
            {isAdmin ? "[BoB-강사] 보안제품개발 김경태" : <div className="timer">
              <h4>{`[BoB-${nMe.role}] 보안제품개발 ${nMe.username}`}</h4>
              <h3>남은 시간 : 9 시간 {min} 분 {sec} 초</h3>
            </div>}
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleVncConnect("http://localhost:5901")}>
          <ListItemText primary="컨테이너 접속" />
        </ListItemButton>
        <ListItemButton onClick={handleVncDisconnect}>
          <ListItemText primary="컨테이너 중지" />
        </ListItemButton>
        {
          nQuizList.map((quiz, index)=>{
            return(
              <Fragment>
              <ListItemButton onClick={()=>{handleQuizChecker(index)}}>
                {q1SendAnswer ? <><CheckCircleOutlineIcon sx={{ color: "#36B13B", marginRight: "15px" }} /> <ListItemText primary={`[문제 ${index+1}] ${quiz.question}`} /> </> : <><RadioButtonUncheckedIcon sx={{ color: "grey", marginRight: "15px" }} /><ListItemText primary={`[문제 ${index+1}] ${quiz.question}`} /></>}
                {quizChecker[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={quizChecker[index]} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={quiz.description} />
                  </ListItemButton>
                  <ListItem sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <div>
                      <S.HelpText>{quiz.title}</S.HelpText>
                      <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" value={answer[index]} onChange={(e)=>{changeAnswer(e.target.value, index)}} />
                    </div>
                    <S.ButtonWrapper>
                      <S.Button onClick={()=>{handleAnswer(quiz.quizId, index)}}>
                        {/*loading ? <CircularProgress /> : "제출하기"*/}
                        {'제출하기'}
                      </S.Button>
                    </S.ButtonWrapper>
                  </ListItem>
                </List>
              </Collapse>
              </Fragment>
            )
          })
        }
      </List>
    </S.Container >
  )
}

export default TestSidebar
