import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { listQuestionnaires } from 'graphql/queries';
import Questionnaire from 'component/orgamisms/Questionnaire';
import * as S from './style';

function Survey() {
  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listQuestionnaires}`);

  const questionnaireList = data.listQuestionnaires.items.map((el: any) => (
    <Questionnaire
      key={el.id}
      question={el.questionTitle}
      questionList={el.questionList}
      bDuplicateSelect={el.bDuplicate} />
  ));

  return (
    <S.SurveyPage>
      {questionnaireList}
    </S.SurveyPage>
  );
}

export default Survey;
