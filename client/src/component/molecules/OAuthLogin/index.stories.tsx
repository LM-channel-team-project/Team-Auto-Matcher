import React from 'react';

import GoogleLogo from 'image/googlelogo.png';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import OAuthLogin from '.';

export default {
  title: 'Molecules/OAuthLogin',
  component: OAuthLogin,
};

export const GitHubLogin = () => (
  <GlobalThemeProvider>
    <OAuthLogin
      onClick={() => {
        console.log('login github');
      }}
      icon={GoogleLogo}
      ButtonTitle={'Login With GitHub'}
    />
  </GlobalThemeProvider>
);
