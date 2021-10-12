import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 96vh;
  background: #2E3336;
  display: flex;
  margin-top: 60px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: space-between;
`;

export const ToolsWrapper = styled.div`
  padding-top: 60px;
  width: 80px;
  height: 100%;
`;

export const TabWrapper = styled.div`
  padding-top: 60px;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const Text = styled.span`
  font-size: 1.1rem;
  color: #9E9E9E;
`;

export const HelpText = styled.span`
  font-size: 0.8rem;
  color: #9E9E9E;
  margin: 0 0 20px 0;
  line-height: 2
`;

export const ButtonWrapper = styled.div`
  display: flex;

`;

export const Button = styled.button`
  color: white;
  width: 90px;
  height: 44px;
  font-size: 1rem;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
`;