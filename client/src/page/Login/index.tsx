import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import * as S from './style';

const googleLoginOnClick = () =>
  Auth.federatedSignIn({
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
      // console.log('Not signed in');
    });
  }, []);

  const onClickGoHome = () => {
    history.push('/');
  };

  return (
    <S.LoginPage className={className}>
      <S.wrapper>
        <S.Title>Team Auto Matcher</S.Title>
        <S.Explanation>로그인이 필요합니다.</S.Explanation>
        <S.Explanation>
          홈화면으로 돌아가시려면
          <S.Reload onClick={onClickGoHome}>이곳</S.Reload>을 눌러주세요.
        </S.Explanation>
        <S.LoginBtn text="구글로그인" onLoginClick={googleLoginOnClick} />
      </S.wrapper>
    </S.LoginPage>
  );
};

export default LoginPage;
