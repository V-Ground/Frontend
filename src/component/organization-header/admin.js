import { useState, useRef, Fragment } from 'react';
import Head from 'next/head';

import styles from '../../../styles/Main.module.css';
import * as S from "./styles";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { render } from 'react-dom';
import VncDisplay from 'react-vnc-display';
import styled, { css } from 'styled-components';


const TabDesign = styled.div`
  span.css-1aquho2-MuiTabs-indicator { border: 2.4px solid #1976d2; }
  .Mui-selected { color: #1976d2 !important; }
  .MuiTab-textColorPrimary { color: #ffffff; }`;


const buttonStyles = (theme) => ({
  root: {
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(buttonStyles)((props) => {
  const { children, styles, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const OrganizationHeader = ({ children }) => {


  const [login, setLogin] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [componentChecker, setComponentChecker] = useState(2);

  const slider = useRef();
  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    ref: slider,
    arrows: false,
    responsive: [
      { breakpoint: 880, settings: { slidesToShow: 3 } },
      { breakpoint: 660, settings: { slidesToShow: 2 } }
    ]
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <Grid container justifyContent='center' className={styles.profileContainer}>
        <Grid item xs={1}></Grid>
        <Grid item xs={1} className={styles.profileImage}>
          <Image src={'/sample/bob_profile.png'} width={160} height={160} />
        </Grid>
        <Grid item xs={10} className={styles.profileTextBox}>
          <Typography variant='body2' className={styles.profileType_admin}>??????</Typography>
          <Typography variant='h6' className={styles.profileInst}>Best of the Best 11???</Typography>
          <Typography variant='body1' className={styles.profileInfo}></Typography>
          <Typography variant='body2' className={styles.profileInfo}>[??????????????????] ?????????</Typography>
          <Typography variant='body2' className={styles.profileInfo}>????????? ?????? ????????? : 24</Typography>
          <Typography variant='body2' className={styles.profileInfo}>???????????? ????????? : 3</Typography>
        </Grid>
        <Grid item xs={3}>
          <TabDesign>
            <Tabs
              style={{ width: "500px" }}
              value={componentChecker}
              onChange={(e, v) => { setComponentChecker(v); }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
              className={styles.tabBox}>
              <Tab label={<Typography className={styles.tabTitle}>????????????</Typography>} {...a11yProps(0)} />
              <Tab label={<Typography className={styles.tabTitle}>????????????</Typography>} {...a11yProps(1)} />
              <Tab label={<Typography className={styles.tabTitle}>?????????</Typography>} {...a11yProps(2)} />
              <Tab label={<Typography className={styles.tabTitle}>????????????</Typography>} {...a11yProps(3)} />
            </Tabs>
          </TabDesign>
        </Grid>
      </Grid>
      <Grid className={styles.boardContainer}>
        {children}
      </Grid>

      <Dialog open={false} onClose={handleClose}>
        <DialogTitle onClose={handleClose} />
        <DialogContent>
          <DialogContentText className={styles.popup}>
            ?????????
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrganizationHeader
