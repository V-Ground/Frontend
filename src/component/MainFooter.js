import styles from '../../styles/Footer.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footerLeftContainer: {
        height: '200px'
    },
    footerRightContainer: {
        height: '200px'
    },
    footerLeftGrid: {
        marginTop: '30px'
    },
    footerLeftButton: {
        fontSize: '13pt',
        width: '80px',
        backgroundColor: '#000000',
        color: '#FFFFFF'
    }
  }));

export default function Footer() {
    const classes = useStyles();
    const router = useRouter();
    return (<>
        {
            router.route == '/login' || /signup/g.exec(router.route) ? '' : 
            <div>
                <Grid className={styles.footerContainer_main} container direction="row" justifycontent="center" alignItems="center">
                    <Grid item xs={5}>
                        <Grid container className={classes.footerLeftContainer} direction="row" justifycontent="center" alignItems="stretch">
                            <Grid item xs={12}>
                                <Grid container justifycontent="flex-start">
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h3">031-698-2795</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifycontent="flex-start">
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">{"고객센터 | AM 09:30 ~ PM 06:30 (주말 및 공휴일 휴무)"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={classes.footerLeftGrid} item xs={12}>
                                <Grid container justifycontent="flex-start">
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={8}>
                                        <Grid container justifycontent="center" spacing={10}>
                                            <Grid item xs={3}><Button className={classes.footerLeftButton} variant="contained" color="default">{"FAQ"}</Button></Grid>
                                            <Grid item xs={3}><Button className={classes.footerLeftButton} variant="contained" color="default">{"Q&A"}</Button></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container className={classes.footerRightContainer} direction="row" justifycontent="center" alignItems="stretch">
                            <Grid item xs={12}>
                                <Grid container justifycontent="flex-start">
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6">주식회사 브로스코</Typography>
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifycontent="flex-start">
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">{"대표자 김태경|사업자등록번호 215-87-78552|통신판매업신고 두호 제 2017-성남분당-0126호 "}{"사업자 정보 확인"}</Typography>
                                        <Typography variant="body2">{"경기 성남시 분당구 대왕판교로645번길 12 8층 R-15호|FAX 031)698-2796"}</Typography>
                                        <Typography variant="body2">{"고객센터 031-698-2795 (평일 9:30-18:30 / 주말 및 공휴일 휴무) | E-mail todd@brosco.co.kr"}</Typography>
                                        <br/>
                                        <Typography variant="body2">{"Copyright ⓒ 2021 일루와마켓 All rights reserved."}</Typography>
                                        <br/>
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifycontent="flex-start">
                                    <Grid item xs={2} ></Grid>
                                    <Grid item md={10}>
                                        <Grid container justifycontent="center">
                                            <Grid item xs={6} lg={3}><Typography variant="body1">{"회원이용약관"}</Typography></Grid>
                                            <Grid item xs={6} lg={3}><Typography variant="body1">{"개인정보취급방침"}</Typography></Grid>
                                            <Grid item xs={6} lg={4}><Typography variant="body1">{"전자금융거래 이용약관"}</Typography></Grid>
                                            <Grid item xs={6} lg={2}><Typography variant="body1">{"공지사항"}</Typography></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={0} lg={0}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        }
        </>
    );
}