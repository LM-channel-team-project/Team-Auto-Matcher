import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import InputText from '.';

export default {
  title: 'Atoms/InputText',
  component: InputText,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <InputText />
    </GlobalThemeProvider>
  );
}
