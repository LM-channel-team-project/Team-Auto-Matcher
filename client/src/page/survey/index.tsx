import React from 'react';
import Questionnaire from 'component/orgamisms/Questionnaire';

function Survey() {
  const questionList = ['React', 'Vue', 'Vanila Javascript', 'React', 'Vue', 'Vanila Javascript'];
  return (
    <div className="App">
      <Questionnaire question={'선호하는 기술스택을 고르세요'} questionList={questionList} bDuplicateSelect={false} />
    </div>
  );
}

export default Survey;
