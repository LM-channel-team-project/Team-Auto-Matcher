import React from 'react';
import { IAnswers } from 'component/molecules/QuestionRespond';
import * as S from './style';

interface IResult {
  userId: string;
  surveyCompleted: boolean;
  answerStorage: IAnswers[];
  onCloseResult: () => void;
}

const Result = ({
  userId, surveyCompleted, answerStorage, onCloseResult,
}: IResult) => {
  console.log(answerStorage);

  return (
    <S.ResultPage>
      <S.Title>설문 결과</S.Title>
      <S.QuestionResult
        answerRespond={answerStorage}
        userId={userId}
        surveyCompleted={surveyCompleted}
        onCloseResult={onCloseResult}
      />
    </S.ResultPage>
  );
};

export default Result;
