import styles from '../../styles/Footer.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import { Button, Typography, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footerLeftContainer: {
        height: '240px'
    },
    footerRightContainer: {
        height: '240px'
    },
    footerLeftGrid: {
        marginTop: '30px'
    },
    footerLeftButton: {
        fontSize: '11pt',
        width: '80px',
        backgroundColor: '#000000',
        color: '#FFFFFF'
    }
}));

export default function Footer() {
    const classes = useStyles();
    const router = useRouter();
    return router.route == '/login' || /signup/g.exec(router.route) ? '' : (<>
        {
            <Grid container justifyContent='center' className={styles.footerContainer}>
                <Grid item xs={6}>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item xs={3}><Typography className={styles.footerTitle}>Gost</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerTitle}>서비스</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerTitle}>약관</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerTitle}>고객센터</Typography></Grid>

                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>기업소개</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>클래스룸</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>개인정보처리방침</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>이메일</Typography></Grid>

                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>채용정보</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>테스트룸</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>이용약관</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>고객센터</Typography></Grid>

                        <Grid item xs={3}><Typography className={styles.footerSubTitle}></Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}>약관</Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}></Typography></Grid>
                        <Grid item xs={3}><Typography className={styles.footerSubTitle}></Typography></Grid>
                    </Grid>
                    <Grid container justifyContent='center' className={styles.footerCompanyContainer}>
                        <Grid item xs={10} className={styles.footerCompanyBox} >
                            <Typography className={styles.footerCompany}>(주)GoST | 대표자:김경태 | 사업번호:123-12-12345 | 사업자 정보 확인</Typography>
                            <Typography className={styles.footerCompany}>통신 판매원 2021-성남분당 B | 개인정보보호책임자:김경태 | 이메일:ghdf@asdfo.com</Typography>
                            <Typography className={styles.footerCompany}>2021 GoST All Rights Reserved</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        }
    </>
    );
}