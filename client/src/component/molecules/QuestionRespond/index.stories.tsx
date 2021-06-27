import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import QuestionRespond from '.';

export default {
  title: 'Molecules/QuestionRespond',
  component: QuestionRespond,
};

const temp = [
  'React',
  'MongoDB',
  'GraphQL',
  'React',
  'react',
  'JS',
  'React',
  'MongoDB',
  'GraphQL',
  'React',
  'react',
  'JS',
];

export function Default() {
  return (
    <GlobalThemeProvider>
      <QuestionRespond
        title="사용하고 싶은 기술스택을 고르세요"
        answers={temp}
      />
    </GlobalThemeProvider>
  );
}
