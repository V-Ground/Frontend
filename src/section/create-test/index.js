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

import WhiteBackground from "../../component/white-background";
import { Divider } from '@mui/material';

import { DropzoneArea } from 'material-ui-dropzone';
import Link from 'next/link';

const CreateCourse = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSoftwareClick = () => {
    setClicked(!clicked);
  }

  const loadingFalse = () => {
    router.push("/question")
  }
  const handleLoading = () => {
    setLoading(true);
    setTimeout(loadingFalse, 2000);
  }
  return (
    <S.Container>
      <WhiteBackground>
        <S.Padding>
          <S.InputColumn>
            <h3>테스트 이름</h3>
            <S.HelpText>해당 테스트의 타이틀로 사용될 이름입니다.</S.HelpText>
            <TextField label="테스트명" variant="outlined" />
          </S.InputColumn>
          <Divider />
          <S.InputColumn>
            <h3>테스트 설명</h3>
            <S.HelpText>학생에게 보여질 해당 테스트의 제약 조건등 상세한 설명을 입력해주세요</S.HelpText>
            <TextField fullWidth label="테스트 설명" variant="outlined" multiline rows={5} />
          </S.InputColumn>
          <Divider />

          <S.InputColumn>
            <h3>썸네일 이미지</h3>
            <S.HelpText>학생에게 보여질 해당 테스트의 썸네일 이미지 입니다.</S.HelpText>
            <DropzoneArea />
          </S.InputColumn>
          <Divider />

          <S.InputColumn>
            <h3>강사 선택</h3>
            <S.HelpText>해당 테스트를 소유하고 관리할 강사를 선택하세요</S.HelpText>
            <div style={{ width: "200px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">강사를 선택하세요</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>[BoB]장원익</MenuItem>
                </Select>
              </FormControl>
            </div>
          </S.InputColumn>

          <Divider />

          <S.InputColumn>
            <h3>테스트 컨테이너 정보</h3>
            <S.HelpText>해당 테스트에서 참가자의 Computing Engine 으로 사용될 컨테이너의 자세한 스펙을 선택해주세요</S.HelpText>
            <S.ContainerSpec>
              <h4>OS</h4>
              <S.HelpText>컨테이너의 Base OS 를 선택하세요</S.HelpText>
              <div style={{ width: "300px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">컨테이너 타입을 선택하세요</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={10}>Redhat Ubuntu</MenuItem>
                    <MenuItem value={10}>Kubuntu</MenuItem>
                    <MenuItem value={20}>Ubuntu 16.04 LTS</MenuItem>
                    <MenuItem value={30}>Ubuntu 20.04 LTS</MenuItem>
                    <MenuItem value={40}>Ubuntu 21.04 LTS</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <h4>소프트웨어</h4>
              <S.HelpText>초기에 설치할 소프트웨어 스택을 선택해주세요</S.HelpText>
              <S.SoftwareWrapper>
                <S.Software clicked={clicked} onClick={handleSoftwareClick}>
                  <S.XIcon>
                    <ClearIcon />
                  </S.XIcon>
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>없음</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://macin.files.wordpress.com/2012/08/ida-6-3-icon.png?w=256" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>IDA</span>
                </S.Software>
                <S.Software>
                  <S.Image src="//upload.wikimedia.org/wikipedia/commons/d/db/Wireshark_Icon.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>Wireshark</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://cdn.icon-icons.com/icons2/3053/PNG/512/burp_suite_macos_bigsur_icon_190319.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>Burp Suite</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://blog.kakaocdn.net/dn/skTqL/btqCrjICmfx/QgSvf45Nshbq7LmDvHphMK/img.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://blog.kakaocdn.net/dn/skTqL/btqCrjICmfx/QgSvf45Nshbq7LmDvHphMK/img.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager 6.2.1</span>
                </S.Software>
              </S.SoftwareWrapper>
              <h4>CPU와 RAM</h4>
              <S.HelpText>컨테이너의 CPU와 RAM 에 대해 선택해주세요</S.HelpText>
              <S.MultiSelectWrapper>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">CPU를 선택하세요</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={10}>1 vCPUs</MenuItem>
                    <MenuItem value={10}>2 vCPUs</MenuItem>
                    <MenuItem value={20}>4 vCPUs</MenuItem>
                    <MenuItem value={30}>8 vCPUs</MenuItem>
                    <MenuItem value={40}>16 vCPUs</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">RAM을 선택하세요</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={10}>0.5 GiB</MenuItem>
                    <MenuItem value={10}>1 GiB</MenuItem>
                    <MenuItem value={20}>2 GiB</MenuItem>
                    <MenuItem value={30}>4 GiB</MenuItem>
                    <MenuItem value={40}>8 GiB</MenuItem>
                  </Select>
                </FormControl>
              </S.MultiSelectWrapper>
              <h4>문제 선택하기</h4>
              <S.HelpText>테스트에서 사용될 문제를 선택하세요. 문제를 선택하면 테스트 참가자는 V-Ground 가 제공되는 문제를 풀게됩니다.</S.HelpText>
              <div style={{ width: "300px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">문제를 선택하세요</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={10}>w-shell을 이용한 침해사고 문제 세트</MenuItem>
                    <MenuItem value={10}>pwnable 통한 시스템 해킹 문제 세트</MenuItem>
                    <MenuItem value={10}>FTZ 시스템 해킹 기초 문제 세트</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <h4>커스텀 문제 업로드</h4>
              <S.HelpText>테스트에서 사용될 문제가 담긴 컨테이너를 업로드하세요. 이미지를 업로드하면 제공되는 문제가 아닌 강사가 직접 문제를 구성하고 채점할 수 있습니다.</S.HelpText>
              <div style={{ width: "300px" }}>
                <DropzoneArea />
              </div>
            </S.ContainerSpec>
          </S.InputColumn>

          <Divider />
          <S.InputColumn>
            <h3>시험 시작시간 및 종료시간</h3>
            <S.HelpText>시험의 시작 시간과 종료 시간을 입력해주세요</S.HelpText>
            <div>
              <TextField sx={{ marginRight: "30px" }} label="시험 시작 시간" variant="outlined" /> <TextField label="시험 종료 시간" variant="outlined" />
            </div>
          </S.InputColumn>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <S.Button onClick={handleLoading}>
              {loading ? <CircularProgress style={{ color: "white" }} /> : "문제 생성하기"}
            </S.Button>
          </div>
        </S.Padding>
      </WhiteBackground>
    </S.Container>
  )
}

export default CreateCourse
