import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import QuestionResult from '.';

export default {
  title: 'Organisms/QuestionResult',
  component: QuestionResult,
};

export const Default = () => (
  <GlobalThemeProvider>
    <QuestionResult />
  </GlobalThemeProvider>
);
