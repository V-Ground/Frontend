import styled from 'styled-components';

export const Container = styled.div`
  width: 260px;
  box-shadow: 0px 13px 22px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 24px;
`;

export const Thumnail = styled.img`
  width: 100%;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
`;

export const Title = styled.h2`
  font-size: 1rem;
  overflow: hidden;
  width: 240px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Instructor = styled.h3`
  font-size: 0.9rem;
`;

export const Button = styled.button`
  color: white;
  width: 80px;
  height: 34px;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const TextWrapper = styled.div`
  padding: 0 12px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 15px 0;
`;