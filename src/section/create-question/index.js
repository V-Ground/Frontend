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

import { Divider } from '@mui/material';
import WhiteBackground from "../../component/white-background";
import { DropzoneArea } from 'material-ui-dropzone';
const CreateQuestion = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([{ a: false }]);

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
            {arr.map(item => (<div style={{ width: "100%", marginTop: "20px" }}>
              <S.HelpText>주관식 문제에 대한 설명과 배점을 입력하세요</S.HelpText>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <TextField sx={{ width: "70%", marginRight: "20px" }} fullWidth label="문제" variant="outlined" />
                <TextField sx={{ width: "30%", marginRight: "20px" }} fullWidth label="정답" variant="outlined" />
                <AddCircleOutlineIcon onClick={handleAddClick} sx={{ color: "green", corsor: "pointer" }} />
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <TextField sx={{ marginTop: "20px", width: "92%" }} fullWidth label="테스트 설명" variant="outlined" multiline rows={5} />
              </div>
            </div>))}
          </S.InputColumn>
          <Divider />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <S.Button onClick={handleLoading}>
              {loading ? <CircularProgress style={{ color: "white" }} /> : "테스트 생성"}
            </S.Button>
          </div>
        </S.Padding>
      </WhiteBackground>
    </S.Container >
  )
}

export default CreateQuestion
