import React from 'react';

import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Questionnaire from '.';

export default {
  title: 'Organisms/Questionnaire',
  component: Questionnaire,
};

export function Default() {
  const questionList = [
    'React',
    'Vue',
    'Vanila Javascript',
    'React',
    'Vue',
    'Vanila Javascript',
  ];
  return (
    <GlobalThemeProvider>
      <Questionnaire
        onClickList={() => console.log('item')}
        question={'선호하는 기술스택을 고르세요'}
        questionList={questionList}
        bDuplicateSelect={false}
        leftOnClick={() => console.log('left')}
        rightOnClick={() => console.log('right')}
        currentPage={3}
        totalPage={15}
      />
    </GlobalThemeProvider>
  );
}
