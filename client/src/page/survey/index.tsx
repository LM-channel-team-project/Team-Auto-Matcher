import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { listQuestionnaire } from 'graphql/queries';
import Questionnaire from 'component/orgamisms/Questionnaire';

function Survey() {
  const questionList = ['React', 'Vue', 'Vanila Javascript', 'React', 'Vue', 'Vanila Javascript'];

  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listQuestionnaire}`);
  return (
    <div className="App">
      <Questionnaire question={'선호하는 기술스택을 고르세요'} questionList={questionList} bDuplicateSelect={false} />
    </div>
  );
}

export default Survey;
