import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { getUser } from 'graphql/queries';
import { IAnswers } from 'component/molecules/QuestionRespond';
import * as S from './style';

function Result() {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(
    gql`
      ${getUser}
    `,
  );

  if (userError) {
    console.error(userError);
  }

  if (userLoading) {
    return <>loading</>;
  }

  const { question } = userData.getUser.items[0];
  const answerRes: IAnswers[] = question
    .filter((answer: IAnswers) => answer.title !== '')
    .map((answer: IAnswers) => ({
      title: answer.title,
      answers: answer.answers,
    }));

  return (
    <S.ResultPage>
      <div className="title">설문 결과</div>
      <S.QuestionResult answerRespond={answerRes} />
      <button>확 정</button>
    </S.ResultPage>
  );
}

export default Result;
