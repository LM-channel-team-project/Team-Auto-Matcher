import React from 'react';
import { ResultProps } from 'types/type';
import * as S from './style';

const Result = ({
  userId,
  surveyCompleted,
  answerRespond,
  onCloseResult,
}: ResultProps) => (
  <S.ResultPage>
    <S.Title>설문 결과</S.Title>
    <S.QuestionResult
      answerRespond={answerRespond}
      userId={userId}
      surveyCompleted={surveyCompleted}
      onCloseResult={onCloseResult}
    />
  </S.ResultPage>
);

export default Result;
