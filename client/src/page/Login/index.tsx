import React, { useEffect } from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useHistory } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import * as S from './style';

const googleLoginOnClick = () => Auth.federatedSignIn({
  provider: CognitoHostedUIIdentityProvider.Google,
});

const LoginPage = ({ className }: any) => {
  const history = useHistory();
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
      case 'signIn':
        history.push('/');
        break;
      case 'signOut':
        history.push('/');
        break;
      case 'customOAuthState':
        break;
      default:
      }
    });

    Auth.currentAuthenticatedUser().catch((e) => {
      console.log('Not signed in');
    });
  }, []);

  const onClickReload = () => {
    window.location.reload();
  };

  return (
    <S.LoginPage className={className}>
      <S.wrapper>
        <S.Title>Team Auto Matcher</S.Title>
        <S.Explanation>로그인이 필요합니다.</S.Explanation>
        <S.Explanation>
          로그인을 하셨다면
          <S.Reload onClick={onClickReload}>이곳</S.Reload>을 눌러주세요.
        </S.Explanation>
        <S.LoginBtn text="구글로그인" onLoginClick={googleLoginOnClick} />
      </S.wrapper>
    </S.LoginPage>
  );
};

export default LoginPage;
