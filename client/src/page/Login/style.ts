import styled from 'styled-components';
import OAuthLoginComponent from 'component/molecules/OAuthLogin';

export const LoginPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  backgroundColor: #696969; 
  borderRadius: 10px;
  width: 200px;
  height: 50px;
  color: white;
  fontWeight: bold;
  cursor: pointer;
`;

export const Title = styled.div`
  fontSize: 45px;
  marginBottom: 15%;
`;

export const GoogleLogin = styled(OAuthLoginComponent)`
  border: 0.2rem solid black;
  :hover {
    cursor: pointer;
  }
`;
