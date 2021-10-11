import { useState } from 'react'

import * as S from "./styles";

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';

import WhiteBackground from "../../component/white-background";
import { Divider } from '@mui/material';

import { DropzoneArea } from 'material-ui-dropzone';

const CreateCourse = () => {

  const [clicked, setClicked] = useState(false);
  const handleSoftwareClick = () => {
    setClicked(!clicked);
  }
  return (
    <S.Container>
      <WhiteBackground>
        <S.Padding>
          <S.InputColumn>
            <h3>클래스 이름</h3>
            <S.HelpText>해당 클래스에 타이틀로 사용될 이름입니다.</S.HelpText>
            <TextField label="클래스명" variant="outlined" />
          </S.InputColumn>
          <Divider />
          <S.InputColumn>
            <h3>클래스 설명</h3>
            <S.HelpText>학생에게 보여질 해당 클래스의 교육 내용과 상세 정보입니다.</S.HelpText>
            <TextField fullWidth label="클래스 설명" variant="outlined" multiline rows={5} />
          </S.InputColumn>
          <Divider />

          <S.InputColumn>
            <h3>썸네일 이미지</h3>
            <S.HelpText>학생에게 보여질 해당 클래스의 썸네일 이미지 입니다.</S.HelpText>
            <DropzoneArea />
          </S.InputColumn>
          <Divider />

          <S.InputColumn>
            <h3>강사 선택</h3>
            <S.HelpText>해당 클래스를 소유하고 관리할 강사를 선택하세요</S.HelpText>
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
            <h3>클래스 컨테이너 정보</h3>
            <S.HelpText>해당 클래스에서 수업 용도로 사용될 컨테이너의 자세한 스펙을 선택해주세요</S.HelpText>
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
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager</span>
                </S.Software>
                <S.Software>
                  <S.Image src="//upload.wikimedia.org/wikipedia/commons/d/db/Wireshark_Icon.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://cdn.icon-icons.com/icons2/3053/PNG/512/burp_suite_macos_bigsur_icon_190319.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://blog.kakaocdn.net/dn/skTqL/btqCrjICmfx/QgSvf45Nshbq7LmDvHphMK/img.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager</span>
                </S.Software>
                <S.Software>
                  <S.Image src="https://blog.kakaocdn.net/dn/skTqL/btqCrjICmfx/QgSvf45Nshbq7LmDvHphMK/img.png" />
                  <span style={{ color: "#525463", fontSize: "0.8rem" }}>FTK Imager</span>
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
            </S.ContainerSpec>
          </S.InputColumn>
          <Divider />
          <S.InputColumn>
            <h3>컨테이너 타입</h3>
            <S.HelpText>클래스에서 사용될 컨테이너의 Interaction Type 을 선택하세요 (GUI, CLI)</S.HelpText>
            <div style={{ width: "300px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">컨테이너 타입을 선택하세요</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>GUI</MenuItem>
                  <MenuItem value={20}>CLI</MenuItem>
                </Select>
              </FormControl>
            </div>
          </S.InputColumn>
          <Divider />
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <S.Button>생성하기</S.Button>
          </div>
        </S.Padding>
      </WhiteBackground>
    </S.Container>
  )
}

export default CreateCourse
