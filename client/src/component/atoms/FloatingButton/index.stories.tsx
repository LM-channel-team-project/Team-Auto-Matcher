import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import FloatingButton, { IFloatingButton } from './index';

export default {
  title: 'Molecules/FloatingButton',
  component: FloatingButton,
};

export function Default(args: IFloatingButton) {
  return (
    <GlobalThemeProvider>
      <FloatingButton {...args} />
    </GlobalThemeProvider>
  );
}
