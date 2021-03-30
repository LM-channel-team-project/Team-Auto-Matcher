import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import QuestionBlock from '.';

export default {
  title: 'Atoms/QuestionBlock',
  component: QuestionBlock,
};

export function Default() {
  return (
    <GlobalThemeProvider>
      <QuestionBlock text={'hi'} />
    </GlobalThemeProvider>
  );
}
