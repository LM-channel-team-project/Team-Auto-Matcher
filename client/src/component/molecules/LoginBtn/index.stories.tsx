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
      <LoginBtn
        onLoginClick={(() => alert('click button'))}
      />
    </GlobalThemeProvider>
  );
}
