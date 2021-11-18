import EmailIcon from '@mui/icons-material/Email';
import { Fragment, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Login.module.css';
import axios from 'axios';
import InfoAlert from '../src/component/InfoAlert';
import FailureAlert from '../src/component/FailureAlert';
import TextField from "@mui/material/TextField";
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

export default function LoginPage () {
    const router = useRouter();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (v) => {
        setId(v);
    }
    const handlePassword = (v) => {
        setPassword(v);
    }

    const Login = async () => {
        try {
            const body = {
                'email' : id,
                'password' : password
            };
            const nData = await axios.post(`/v1/authentificate`, body);
            router.replace(`/?uid=${nData.data.id}&name=${nData.data.username}&role=${nData.data.role}`);
        } catch(err) {
            if(err.response.status == 403 || err.response.status == 401){
                FailureAlert("이메일 혹은 비밀번호를 확인해주세요.");
            } else {
                FailureAlert("에러가 발생하였습니다.");
            }
        }
    }

    return (
        <Fragment>
            <Head>
                <title>로그인</title>
            </Head>
            <div>
                    <div className={styles.leftTitle}>
                    <Link href="/">
                        V-Ground
                    </Link>
                    </div>
                <div className={styles.contents_box}>
                    <div className={styles.title}>로그인</div>
                    <div className={styles.comment}>V-Ground에 어서오세요</div>
                    <div className={styles.type_boxes}>
                        <Grid container justifyContent='center'>
                            <Grid item className={styles.loginTextFieldItem} xs={12}>
                                <TextField value={id} onChange={(e)=>{handleId(e.target.value)}} placeholder='이메일' />
                            </Grid>
                            <Grid item className={styles.loginTextFieldItem} xs={12}>
                                <TextField value={password} onChange={(e)=>{handlePassword(e.target.value)}} placeholder='비밀번호' />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={Login}>로그인</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={styles.check_comment}>계정이 없으신가요?{/*<Link href="/signup">*/}<span onClick={()=>{InfoAlert(`차후 추가될 예정입니다.`)}} className={styles.signup}>회원가입</span>{/*</Link>*/}</div>
                </div>
                <div className={styles.rightimg}></div>
            </div>
        </Fragment>
    )
}

const Button = styled.button`
  color: white;
  width: 100px;
  height: 44px;
  font-size: 1rem;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;