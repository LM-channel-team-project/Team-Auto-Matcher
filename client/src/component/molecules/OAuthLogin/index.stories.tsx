import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import GoogleLogo from 'image/googlelogo.png';
import OAuthLogin from '.';

export default {
  title: 'Molecules/OAuthLogin',
  component: OAuthLogin,
};

export const GitHubLogin = () => (
  <GlobalThemeProvider>
    <OAuthLogin
      onClick={() => {
        alert('login github');
      }}
      icon={GoogleLogo}
      ButtonTitle={'Login With GitHub'}
    />
  </GlobalThemeProvider>
);
