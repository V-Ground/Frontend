import { useState } from 'react'
import { useRouter } from "next/router";
import * as S from "./styles";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import FailureAlert from '../../component/FailureAlert';
import SuccessAlert from '../../component/SuccessAlert';

import { Divider } from '@mui/material';
import WhiteBackground from "../../component/white-background";
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
const CreateQuestion = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([{ a: false }]);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizOpen, setQuizOpen] = useState(Date.now());
  const [quizClose, setQuizClose] = useState(Date.now());
  const [quizChildrenList, setQuizChildrenList] = useState([{
    'question': '',
    'description': '',
    'answer': '',
    'score': 0
  }]);

  const handleQuiz = async () => {
    try {
      await axios.post(`/v1/evaluations/${router.query.id}/quizzes`, quizChildrenList);
      SuccessAlert('과제가 성공적으로 추가되었습니다.');
      router.push(`/assignment/test/${router.query.id}`);
    } catch(err) {
      console.log('error :', err)
      if(err?.response?.status == 403 || err?.response?.status == 401){
        FailureAlert('로그인이 필요합니다.');
      } else {
        FailureAlert('에러가 발생하였습니다.');
      }
    }
  }

  const handleQuizChildrenQuestion = (data, index) => {
    const copyList = quizChildrenList.slice();
    copyList[index] = {
      'question': data,
      'description': quizChildrenList[index].description,
      'answer': quizChildrenList[index].answer,
      'score': quizChildrenList[index].score
    }
    setQuizChildrenList(copyList);
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
      'question': '',
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

  const handleAddClick = () => {
    setArr([...arr, { a: false }])
  }

  const handleSoftwareClick = () => {
    setClicked(!clicked);
  }

  const loadingFalse = () => {
    router.push("/test-created");
  }
  const handleLoading = () => {
    setLoading(true);
    setTimeout(loadingFalse, 2000);
  }
  return (
    <S.Container>
      <WhiteBackground>
        <S.Padding>
          <Divider />
          <S.InputColumn style={{ width: "80%" }}>
            <h3>주관식 문제</h3>
            {quizChildrenList.map((item, index) => (<div style={{ width: "100%", marginTop: "20px" }}>
              <S.HelpText>주관식 문제에 대한 설명과 배점을 입력하세요</S.HelpText>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <TextField sx={{ width: "50%", marginRight: "20px" }} fullWidth label="문제" variant="outlined" value={item.question} onChange={(e)=>{handleQuizChildrenQuestion(e.target.value, index)}}  />
                <TextField sx={{ width: "30%", marginRight: "20px" }} fullWidth label="정답" variant="outlined" value={item.answer} onChange={(e)=>{handleQuizChildrenAnswer(e.target.value, index)}} />
                <TextField sx={{ width: "20%", marginRight: "20px" }} fullWidth label="배점" variant="outlined" value={item.score} onChange={(e)=>{handleQuizChildrenScore(e.target.value, index)}} />
                {quizChildrenList.length == index+1 ? <AddCircleOutlineIcon onClick={addQuizChildren} sx={{ color: "green" }} /> : <RemoveCircleOutlineIcon onClick={()=>{deleteQuizChildren(index)}} sx={{ color: "red" }} />}
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <TextField sx={{ marginTop: "20px", width: "92%" }} fullWidth label="테스트 설명" variant="outlined" multiline rows={5} value={item.description} onChange={(e)=>{handleQuizChildrenDescription(e.target.value, index)}} />
              </div>
            </div>))}
          </S.InputColumn>
          <Divider />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <S.Button onClick={handleQuiz}>
              {/*loading ? <CircularProgress style={{ color: "white" }} /> : "테스트 생성"*/}
              {"테스트 생성"}
            </S.Button>
          </div>
        </S.Padding>
      </WhiteBackground>
    </S.Container >
  )
}

export default CreateQuestion
