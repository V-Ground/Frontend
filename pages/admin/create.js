import React from 'react'

import CreateCourse from "../../src/section/create-course";
import axios from 'axios';

export default function create ({nMe}) {
  return <CreateCourse nMe={nMe} />
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
      nMe: nMe?.data ? nMe?.data : {},
    }
}
}
