import React, {useEffect, Fragment} from 'react';
import styles from '../../styles/Header.module.css';
import Grid from '@material-ui/core/Grid';
import { useRouter, useState } from 'next/router';
import Link from 'next/link'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Typography, Button } from '@material-ui/core';
import FailureAlert from '../component/FailureAlert';
import InfoAlert from '../component/InfoAlert';
import axios from 'axios';

export default function Header(props) {
  const router = useRouter();
  console.log('query in header : ', router.query);
  const [open, setOpen] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isLogined, setIsLogined] = React.useState(false);
  const Logout = async () => {
    try {
        await axios.get(`/v1/authenticate`);
        router.replace('/');
        InfoAlert('로그아웃되셨습니다.');
    } catch(err) {
      if(err.response.status == 403 || err.response.status == 401){
        FailureAlert("이메일 혹은 비밀번호를 확인해주세요.");
      } else {
          FailureAlert("에러가 발생하였습니다.");
      }
    }
  }

  // const updateScroll = () => {
  //   setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  // }
  // React.useEffect(() => {
  //   window.addEventListener('scroll', updateScroll);
  // });

  useEffect(async () => {
    try {
        const checkLogin = await axios.get('/v1/authenticate/me');
        if (checkLogin) {
            setIsLogined(true);
        } else {
            setIsLogined(false);
        }
    } catch(err) {
        setIsLogined(false);
    }
});

  return router.route == '/login' || /signup/g.exec(router.route) ? '' : (
    <Grid style={{ boxShadow: "0px 3px 22px rgba(0, 0, 0, 0.16)", background: "white" }} container className={styles.headerContainer}>
      <Grid item className={styles.leftTitle} xs={1}>
        <Link href="/">
          V-Ground
        </Link>
      </Grid>
      <Grid item xs={9}>
      </Grid>
          {
            !isLogined ?
            <Fragment>
            <Grid item xs={1}>
            <Link href="/login">
              <Typography className={`${styles.textAlignRight} ${styles.mouseHover}`} variant='body1'>로그인</Typography>
            </Link>
            </Grid>
            <Grid item xs={1}>
              {/*<Link href="/register">*/}
                <Typography variant='body1' className={styles.mouseHover} onClick={()=>{InfoAlert(`차후 추가될 예정입니다.`)}}>회원가입</Typography>
              {/*</Link>*/}
            </Grid>
            </Fragment>
            :
            <Grid item xs={1}>
              <Typography className={`${styles.textAlignRight} ${styles.mouseHover}`} onClick={Logout} variant='body1'>로그아웃</Typography>
            </Grid>
          }
    </Grid>
  );
}