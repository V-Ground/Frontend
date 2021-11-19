import { useState } from 'react'
import { useRouter } from "next/router";

import * as  S from "./styles";
import { data } from "./data";

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

const CourseMain = () => {

  const router = useRouter();
  const { courseInfo, assignments } = data;
  const [containerStatus, setContainerStatus] = useState('중지');

  return (
    <S.Container>
      <S.CourseHeaderWrapper>
        <CourseHeader
          title={courseInfo.title}
          instructor={courseInfo.instructor}
          thumnailImageUrl={courseInfo.thumnailImageUrl}
          containerStatus={containerStatus}
          setContainerStatus={setContainerStatus} />
      </S.CourseHeaderWrapper>
      <S.AssignmentWrapper>
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
              {assignments.length === 0 ? <></> : assignments.map((assignment) => (
                <TableRow
                  key={assignment.id}
                  hover
                  onClick={() => router.push("/assignment")}
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
      </S.AssignmentWrapper>
    </S.Container>
  )
}

export default CourseMain
