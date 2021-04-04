import React, { useEffect } from 'react';
import GoogleLogo from 'image/googlelogo.png';
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
        break;
      case 'customOAuthState':
        break;
      default:
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user))
      .catch((e) => {
        console.log('login error : ', e);
        console.log('Not signed in');
      });
  }, []);

  return (
    <S.LoginPage className={className}>
      <S.GoogleLogin
        icon={GoogleLogo}
        ButtonTitle={'Login With Google'}
        onClick={googleLoginOnClick}
      />
    </S.LoginPage>
  );
};

export default LoginPage;
