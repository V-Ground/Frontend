import React from 'react'

import CreateTest from "../../src/section/create-test";
import axios from 'axios';

export default function createTest ({nMe}) {
  return (
    <div>
      <CreateTest nMe={nMe} />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  let nMe = {};
  try {
    const cookies = ctx.req.headers.cookie;
    nMe = await axios.get(`/v1/authenticate/me`, {
      headers: {
          Cookie: cookies
      },
      withCredentials : true
    });
  } catch(err) {
    if(err?.response?.status == 403 || err?.response?.status == 401){
      console.log('로그인 전');
    }
  }
  return {
    props: {
      nMe: nMe?.data ? nMe?.data : {
        "id": 6,
        "email": "teacher1@vground.com",
        "username": "정승기",
        "role": "강사"
      },
    }
}
}
