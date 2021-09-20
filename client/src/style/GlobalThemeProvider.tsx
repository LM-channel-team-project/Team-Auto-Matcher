import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import theme from './theme';

interface Prop {
  children?: React.ReactElement | React.ReactElement[] | string;
}

const GlobalThemeProvider = ({ children }: Prop) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default GlobalThemeProvider;
