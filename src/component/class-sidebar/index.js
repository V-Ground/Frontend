import { useState, useEffect, useRef } from 'react'

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



const TestSidebar = ({ isAdmin, handleVncConnect, handleVncDisconnect }) => {

  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  const [q1SendAnswer, setQ1SendAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQ1 = () => {
    setQ1(!q1);
  }

  const handleQ2 = () => {
    setQ2(!q2);
  }

  const handleQ3 = () => {
    setQ3(!q3);
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
            {isAdmin ? "[BoB-??????] ?????????????????? ?????????" : <div className="timer">
              <h4>[BoB] ?????????????????? ?????????</h4>
              <h3>?????? ?????? : 9 ?????? {min} ??? {sec} ???</h3>
            </div>}
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleVncConnect("http://localhost:5901")}>
          <ListItemText primary="???????????? ??????" />
        </ListItemButton>
        <ListItemButton onClick={handleVncDisconnect}>
          <ListItemText primary="???????????? ??????" />
        </ListItemButton>
        <ListItemButton onClick={handleQ1}>
          {q1SendAnswer ? <><CheckCircleOutlineIcon sx={{ color: "#36B13B", marginRight: "15px" }} /> <ListItemText primary="[?????? 1] ????????? ?????? ????????????" /> </> : <><RadioButtonUncheckedIcon sx={{ color: "grey", marginRight: "15px" }} /><ListItemText primary="[?????? 1] ????????? ?????? ????????????" /></>}
          {q1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={q1} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="?????? ??????" />
            </ListItemButton>
            <ListItem sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
              <div>
                <S.HelpText>???????????? ????????? ???????????? ????????? IP??? ????????????</S.HelpText>
                <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" />
              </div>
              <S.ButtonWrapper>
                <S.Button onClick={handleSubmit}>
                  {loading ? <CircularProgress /> : "????????????"}
                </S.Button>
              </S.ButtonWrapper>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={handleQ2}>
          <RadioButtonUncheckedIcon sx={{ color: "grey", marginRight: "15px" }} /><ListItemText primary="[?????? 2] ?????? ?????? ??????" />
          {q2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={q2} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="?????? ??????" />
            </ListItemButton>
            <ListItem sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
              <div>
                <S.HelpText>?????? ???????????? ????????? ???????????? ?????? ???????????? ???????????? ?????? ?????? ???????????? ???????????????. ?????? ????????? ?????????????????? ????????????</S.HelpText>
                <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" />
              </div>
              <S.ButtonWrapper>
                <S.Button>????????????</S.Button>
              </S.ButtonWrapper>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={handleQ3}>
          <RadioButtonUncheckedIcon sx={{ color: "grey", marginRight: "15px" }} /><ListItemText primary="[?????? 3] ??? ?????? ?????? ??????" />
          {q3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={q3} timeout="auto" unmountOnExit sx={{ background: "#373F45" }}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="?????? ??????" />
            </ListItemButton>
            <ListItem sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
              <div>
                <S.HelpText>????????? ?????? ????????? ????????? ????????? ???????????? ?????? ???????????????</S.HelpText>
                <TextField inputProps={{ sx: "color: #F7F7F7" }} fullWidth color="primary" />
              </div>
              <S.ButtonWrapper>
                <S.Button>????????????</S.Button>
              </S.ButtonWrapper>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </S.Container >
  )
}

export default TestSidebar
