import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import ProgressBarList from '.';

export default {
  title: 'Atoms/ProgressBarList',
  component: ProgressBarList,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <ProgressBarList Brief='items' onClickList={() => alert('items')}/>
    </GlobalThemeProvider>
  );
}
