import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import ArrowNav from '.';

export default {
  title: 'Molecules/ArrowNav',
  component: ArrowNav,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <ArrowNav />
    </GlobalThemeProvider>
  );
}
