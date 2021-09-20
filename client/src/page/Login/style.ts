import styled from 'styled-components';

import LoginBtnComponent from 'component/molecules/LoginBtn';

export const LoginPage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const wrapper = styled.div`
  padding: 2rem 5rem;
  border-radius: 20px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginBtn = styled(LoginBtnComponent)``;

export const Title = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

export const Explanation = styled.div`
  font-size: 1.3rem;
  margin-bottom: 2rem;
`;

export const Reload = styled.span`
  cursor: pointer;
  margin: 0 1rem;
  color: blue;
  font-size: 2rem;
`;
