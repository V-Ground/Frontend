import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const CourseHeaderWrapper = styled.div`
  width: 90%;
  max-width: 1100px;
  margin-top: 70px;
`;

export const AssignmentWrapper = styled.div`
  width: 90%;
  max-width: 1100px;
`;

export const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

export const Others = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 40px;

  span {
    margin: 0 5px;
  }
`;

export const AssignmentTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #707070;
  border-radius: 10px;
`;

export const AssignmentTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Padding = styled.div`
  padding: 60px;
`;

export const Button = styled.button`
  color: white;
  width: 80px;
  height: 34px;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 40px;
`;

export const quizChildrenOpen = styled.button`
  color: white;
  cursor: pointer;
  padding: 2px 10px;
  font-size: 15px;
  margin-left: 10px;
  background: #5094FA;
  border: none;
  border-radius: 15px;
`