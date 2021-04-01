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
      <S.QuestionBlock text={question} className={`${className} question`} />
      <S.MultiCheckbox questionList={questionList} bDuplicateSelect={bDuplicateSelect} />
    </S.Questionnaire>
  );
}

export default Questionnaire;
