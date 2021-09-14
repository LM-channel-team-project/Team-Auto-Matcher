import React from 'react';
import { Answers } from 'types/type';
import * as S from './style';

export interface ResultProps {
  userId: string;
  surveyCompleted: boolean;
  answerRespond: Answers[];
  onCloseResult: () => void;
}

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
