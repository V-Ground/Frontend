import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Padding = styled.div`
  padding: 50px;
`;

export const InputColumn = styled.div`
  display:flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin: 14px;
`;

export const HelpText = styled.span`
  font-size: 0.8rem;
  color: #9E9E9E;
  margin: 0 0 20px 0;
`;

export const ContainerSpec = styled.div`
  width: 100%;
  background: #F1F4FC;
  box-shadow: 0px 3px 22px rgba(0, 0, 0, 0.16);
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const MultiSelectWrapper = styled.div`
  width: 500px;
  display: flex;
  div {
    margin-right: 10px;
  }
`;

export const Button = styled.button`
  color: white;
  width: 110px;
  height: 44px;
  font-size: 1rem;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
`;

export const SoftwareWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Software = styled.div`
  width: 120px;
  height: 100px;
  box-shadow: 0px 3px 22px rgba(0, 0, 0, 0.16);
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin: 20px;

  border: ${({ clicked }) => clicked ? "2px solid #5094FA" : ""};
  cursor: pointer;
`;

export const Image = styled.img`
  width: 60px;
  border-radius: 30px;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const XIcon = styled.div`
  font-size: 2rem;
`;