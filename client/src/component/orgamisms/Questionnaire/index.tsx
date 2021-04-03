import React from 'react';
import * as S from './style';

interface IQuestionnaire {
  question: string;
  questionList: string[];
  bDuplicateSelect: boolean;
  className?: string;
}

function Questionnaire({
  question, questionList, bDuplicateSelect, className,
}: IQuestionnaire) {
  return (
    <S.Questionnaire className={className}>
      <S.QuestionBlock className={`${className}`}>{question}</S.QuestionBlock>
      <S.MultiCheckbox questionList={questionList} bDuplicateSelect={bDuplicateSelect} />
      <S.ArrowNav />
    </S.Questionnaire>
  );
}

export default Questionnaire;
