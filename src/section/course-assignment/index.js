import { useState } from 'react'

import * as  S from "./styles";
import { data } from "./data";

import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import CourseHeader from "../../component/course-header";
import Modal from "../../component/modal";
import WhiteBackground from "../../component/white-background";


const convertToChip = (string) => {
  if (string === "마감") return <Chip label={string} />
  else if (string === "진행중") return <Chip color="success" label={string} />
}

const CourseAssignment = () => {


  const { courseInfo, assignment } = data;

  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  }

  const handleModalOpen = () => {
    setIsOpen(true);
  }

  const { title,
    status,
    startedAt,
    endedAt,
    description,
    submitStatus
  } = assignment;

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
        <WhiteBackground>
          <S.Header>
            <S.Title>1 {title}</S.Title>
            <S.Others>
              <span>{convertToChip(status)}</span>
              <span>{startedAt} ~ {endedAt}</span>
            </S.Others>
          </S.Header>
          <Divider />
          <S.Padding style={{ lineHeight: "2" }}>
            <h3>과제 설명</h3>
            {description}
            <h3 style={{ marginTop: "60px" }}>제출 상황</h3>
            <S.AssignmentTableWrapper>
              <S.AssignmentTable>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">제출 상황</TableCell>
                      <TableCell align="left">{submitStatus.status}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">배점</TableCell>
                      <TableCell align="left">{submitStatus.score}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">마지막 제출일</TableCell>
                      <TableCell align="left">{submitStatus.lastModifiedAt}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">과제 타입</TableCell>
                      <TableCell align="left">{submitStatus.constraint}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </S.AssignmentTable>
              <S.Button onClick={handleModalOpen}>제출</S.Button>
            </S.AssignmentTableWrapper>
          </S.Padding>
        </WhiteBackground>
      </S.AssignmentWrapper>
      <Modal open={isOpen} handleOnModalClose={handleModalClose}>
        <h2>과제 제출</h2>
        <div>
          공격자의 IP와 Port 를 입력하세요
          <input type="text" placeholder="정답을 입력하세요" />
        </div>
        <S.Button onClick={handleModalClose}>제출</S.Button>
      </Modal>
    </S.Container>
  )
}

export default CourseAssignment
