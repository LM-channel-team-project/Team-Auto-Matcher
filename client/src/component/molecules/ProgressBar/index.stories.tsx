import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import ProgressBar from '.';

export default {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <ProgressBar
        onClickList={() => console.log('items')}
        currentPage={3}
        totalPage={15}
      />
    </GlobalThemeProvider>
  );
}
