import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Loading from '.';

export default {
  title: 'Molecules/Loading',
  component: Loading,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <Loading />
    </GlobalThemeProvider>
  );
}
