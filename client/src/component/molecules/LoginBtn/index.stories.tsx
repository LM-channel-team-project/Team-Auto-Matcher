import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import LoginBtn from '.';

export default {
  title: 'Molecules/LoginBtn',
  component: LoginBtn,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <LoginBtn text="구글로그인" onLoginClick={() => console.log('click button')} />
    </GlobalThemeProvider>
  );
}
