import React from 'react';
import { IAnswers } from 'component/molecules/QuestionRespond';
import Button from 'component/atoms/Button';
import * as S from './style';

interface IQuestionResult {
  answerRespond: IAnswers[];
  className?: string;
}

function QuestionResult({ answerRespond, className }: IQuestionResult) {
  const QuestionRespondList = answerRespond.map((answer: IAnswers) => (
    <S.QuestionRespond
      key={answer.title}
      title={answer.title}
      answers={answer.answers}
    />
  ));
  return (
    <>
      <S.QuestionResult className={className}>
        {QuestionRespondList}
      </S.QuestionResult>
      <Button size="biglarge" color="gray">
        확정
      </Button>
    </>
  );
}

export default QuestionResult;
