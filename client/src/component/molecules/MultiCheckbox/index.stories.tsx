import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import MultiCheckbox from '.';

export default {
  title: 'Molecules/MultiCheckbox',
  component: MultiCheckbox,
};

export function Default() {
  const questionList = ['React', 'Vue', 'Vanila Javascript', 'React', 'Vue', 'Vanila Javascript'];
  return (
    <GlobalThemeProvider>
      <MultiCheckbox questionList={questionList} />
    </GlobalThemeProvider>
  );
}
