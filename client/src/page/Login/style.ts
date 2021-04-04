import styled from 'styled-components';
import OAuthLoginComponent from 'component/molecules/OAuthLogin';

export const LoginPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GoogleLogin = styled(OAuthLoginComponent)`
  border: 0.2rem solid black;
  :hover {
    cursor: pointer;
  }
`;
