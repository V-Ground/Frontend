import React from 'react'
import { useRouter } from "next/router";
import styled from 'styled-components';

const adf291sccdDf20fkjseen = () => {

  const router = useRouter();

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div>
          <h3>김경태 강사님으로부터 초대가 되었습니다.</h3>
          <br />
          <h4>클래스명 : [BoB] 클라우드 기초</h4>
          <h4>강사 : 김경태</h4>
        </div>
        <Image src="/sample/invitation.svg" />
      </div>
      <div>
        <Button onClick={() => router.push("/course")}>클래스 입장하기</Button>
      </div>
    </Container>
  )
}

export default adf291sccdDf20fkjseen

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 300px;
`;

const Button = styled.button`
  color: white;
  width: 130px;
  height: 44px;
  font-size: 1rem;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 90px;
`;