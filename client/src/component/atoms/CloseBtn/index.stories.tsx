import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import CloseBtn from './index';

export default {
  title: 'Atoms/CloseBtn',
  component: CloseBtn,
};

export const Default = (args: {}) => (
  <GlobalThemeProvider>
    <CloseBtn {...args} />
  </GlobalThemeProvider>
);
