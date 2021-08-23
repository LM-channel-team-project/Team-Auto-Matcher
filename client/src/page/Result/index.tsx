import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { getUser } from 'graphql/queries';
import { IAnswers } from 'component/molecules/QuestionRespond';
import * as S from './style';

const Result = ({ className, isLoggedIn }: any) => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    gql`
      ${getUser}
    `,
  );
  const history = useHistory();
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [isLoggedIn]);

  if (userError) {
    console.error(userError);
  }

  if (userLoading) {
    return (
      <S.LoadContainer>
        <S.LoadingComponent />
      </S.LoadContainer>
    );
  }
  const items = userData.getUser.items[0];
  const { question } = items;
  const answerRes: IAnswers[] = question
    .filter((answer: IAnswers) => answer.title !== '')
    .map((answer: IAnswers) => ({
      title: answer.title,
      answers: answer.answers,
    }));

  return (
    <S.ResultPage>
      <div className="title">설문 결과</div>
      <S.QuestionResult
        answerRespond={answerRes}
        id={items.id}
        surveyCompleted={items.surveyCompleted}
      />
    </S.ResultPage>
  );
};

export default Result;
