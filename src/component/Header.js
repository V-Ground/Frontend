import React from 'react';
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

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }
  React.useEffect(() => {
    window.addEventListener('scroll', updateScroll);
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
      <Grid item xs={1}>
        <Typography className={styles.textAlignRight} variant='body1'>로그인</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant='body1'>회원가입</Typography>
      </Grid>
    </Grid>
  );
}