import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const Back = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Course = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ContainerButtons = styled.div`
  display: flex;
  button {
    margin: 20px 20px 0 0;
  }
`;

export const Button = styled.button`
  color: white;
  width: 100px;
  height: 34px;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;