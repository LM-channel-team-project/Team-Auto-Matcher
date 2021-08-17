import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Checkbox from '.';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <Checkbox />
    </GlobalThemeProvider>
  );
}
