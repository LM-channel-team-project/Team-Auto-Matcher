import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { listQuestionnaires } from 'graphql/queries';
import Questionnaire from 'component/orgamisms/Questionnaire';
import * as S from './style';

function Survey() {
  const {
    loading, error, data, refetch,
  } = useQuery(gql`${listQuestionnaires}`);

  const [page, setPage] = useState<number>(0);

  if (loading) {
    return (<div>loading</div>);
  }

  const nowQuestionnaire = data.listQuestionnaires.items[page];

  const onIncrease = () => {
    setPage((prevPage) => {
      if (prevPage < data.listQuestionnaires.items.length - 1) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  const onDecrease = () => {
    setPage((prevPage) => {
      if (prevPage !== 0) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  return (
    <S.SurveyPage>
      <Questionnaire
        key={nowQuestionnaire.id}
        question={nowQuestionnaire.questionTitle}
        questionList={nowQuestionnaire.questionList}
        bDuplicateSelect={nowQuestionnaire.bDuplicate}
        leftOnClick={onDecrease}
        rightOnClick={onIncrease}
      />
    </S.SurveyPage>
  );
}

export default Survey;
