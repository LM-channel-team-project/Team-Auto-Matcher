import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import PageCnt from '.';

export default {
  title: 'Molecules/PageCnt',
  component: PageCnt,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <PageCnt currentPage={3} totalPage={15} />
    </GlobalThemeProvider>
  );
}
