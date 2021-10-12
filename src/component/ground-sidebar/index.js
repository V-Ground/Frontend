import React from 'react'

import * as S from "./styles";

import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const GroundSidebar = () => {
  return (
    <S.Container>
      <S.TabWrapper>
        <List sx={{ width: '100%', bgcolor: '#2E3336' }}>
          <ListItem sx={{ margin: "10px 0" }}>
            <S.Text>시작</S.Text>
          </ListItem>
          <ListItem sx={{ margin: "10px 0" }}>
            <S.Text>중지</S.Text>
          </ListItem>
          <ListItem sx={{ margin: "10px 0" }}>
            <S.Text>과제 및 퀴즈</S.Text>
          </ListItem>
          <ListItem sx={{ margin: "10px 0" }}>
            <S.Text>스냅샷 불러오기</S.Text>
          </ListItem>
        </List>
      </S.TabWrapper>
    </S.Container>
  )
}

export default GroundSidebar
