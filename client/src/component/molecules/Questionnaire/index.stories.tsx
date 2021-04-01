import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Questionnaire from '.';

export default {
  title: 'Molecules/Questionnaire',
  component: Questionnaire,
};

export function Default() {
  const questionList = ['React', 'Vue', 'Vanila Javascript'];
  return (
    <GlobalThemeProvider>
      <Questionnaire question={'선호하는 기술스택을 고르세요'} questionList={questionList} bDuplicateSelect={false} />
    </GlobalThemeProvider>
  );
}
