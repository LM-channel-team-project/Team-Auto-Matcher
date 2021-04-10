import React from 'react';
import * as S from './style';

interface IQuestionResult {
  className?: string;
}

function QuestionResult({
  className,
}: IQuestionResult) {
  return (
    <S.QuestionResult className={className}>
      questionResult
    </S.QuestionResult>
  );
}

export default QuestionResult;
