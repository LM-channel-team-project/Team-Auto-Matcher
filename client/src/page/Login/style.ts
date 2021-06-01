import styled from 'styled-components';
import LoginBtnComponent from 'component/molecules/LoginBtn';

export const LoginPage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const wrapper = styled.div`
  padding: 50px 90px;
  border-radius: 20px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginBtn = styled(LoginBtnComponent)`
`;

export const Title = styled.div`
  font-size: 45px;
  margin-bottom: 50%;
`;
