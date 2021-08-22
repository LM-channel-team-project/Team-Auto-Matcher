import React from 'react';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import QuestionResult from '.';

export default {
  title: 'Organisms/QuestionResult',
  component: QuestionResult,
};

const test = [
  {
    title: '하고싶은 개발 분야를 선택하세요',
    answers: ['백엔드'],
  },
  {
    title: '선호하는 기술 스택을 고르세요',
    answers: ['MySQL', 'GraphQL'],
  },
];
export const Default = () => (
  <GlobalThemeProvider>
    <QuestionResult answerRespond={test} />
  </GlobalThemeProvider>
);
