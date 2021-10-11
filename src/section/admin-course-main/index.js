import { useState } from 'react'

import * as  S from "./styles";
import { data } from "./data";


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

import CourseHeader from "../../component/course-header";
import WhiteBackground from "../../component/white-background";


const convertToChip = (string) => {
  if (string === "마감") return <Chip label={string} />
  else if (string === "진행중") return <Chip color="success" label={string} />
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


  const { courseInfo, assignments } = data;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <S.Container>
      <S.CourseHeaderWrapper>
        <CourseHeader
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
            Item One
      </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
      </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
      </TabPanel>
        </Box>
      </S.AssignmentWrapper>
    </S.Container>
  )
}

export default CourseMain

/*
<WhiteBackground>
          <S.Header>
            과제
          </S.Header>
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
        */