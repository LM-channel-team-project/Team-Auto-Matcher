import React from 'react';
import { IAnswers } from 'component/molecules/QuestionRespond';
import * as S from './style';

interface IQuestionResult {
  answerRespond: IAnswers[];
  className?: string;
}

function QuestionResult({
  answerRespond,
  className,
}: IQuestionResult) {
  const QuestionRespondList = answerRespond.map((answer: IAnswers) => (
    <S.QuestionRespond
      key={answer.title}
      title={answer.title}
      answers={answer.answers}
    />
  ));
  return (
    <S.QuestionResult className={className}>
      {QuestionRespondList}
    </S.QuestionResult>
  );
}

export default QuestionResult;
