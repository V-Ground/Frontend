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

export const Header = styled.h2`
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
`;

export const AdminHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  font-weight: bold;
`;

export const Text = styled.div`
  font-size: 1rem;
  margin-right: 40px;
  color: #5094FA;
  cursor: pointer;
`;

export const CreateAssignmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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

export const Button = styled.button`
  color: white;
  width: 90px;
  height: 44px;
  font-size: 1rem;
  background: #5094FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
`;

export const AdminCourseTitle = styled.h3`
  padding-left: 20px;
`;