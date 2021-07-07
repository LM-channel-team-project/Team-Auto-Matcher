import React, { useEffect } from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth, Hub } from 'aws-amplify';
import * as S from './style';

const googleLoginOnClick = () => Auth.federatedSignIn({
  provider: CognitoHostedUIIdentityProvider.Google,
});

const LoginPage = ({ className }: any) => {
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
      case 'signIn':
        window.location.href = '/';
        break;
      case 'signOut':
        window.location.href = '/';
        break;
      case 'customOAuthState':
        break;
      default:
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user))
      .catch((e) => {
        console.log('Not signed in');
      });
  }, []);

  return (
    <S.LoginPage className={className}>
      <S.wrapper>
        <S.Title>Team Auto Mathcer</S.Title>
        <S.LoginBtn onLoginClick={googleLoginOnClick} />
      </S.wrapper>
    </S.LoginPage>
  );
};

export default LoginPage;
