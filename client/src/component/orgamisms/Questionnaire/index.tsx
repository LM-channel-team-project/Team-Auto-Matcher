import React from 'react';
import * as S from './style';

interface IQuestionnaire {
  question: string;
  questionList: string[];
  bDuplicateSelect: boolean;
  leftOnClick: React.MouseEventHandler<HTMLDivElement>;
  rightOnClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

function Questionnaire({
  question,
  questionList,
  bDuplicateSelect,
  leftOnClick,
  rightOnClick,
  className,
}: IQuestionnaire) {
  return (
    <S.Questionnaire className={className}>
      <S.QuestionBlock className={`${className}`}>{question}</S.QuestionBlock>
      <S.MultiCheckbox questionList={questionList} bDuplicateSelect={bDuplicateSelect} />
      <S.ArrowNav leftOnClick={leftOnClick} rightOnClick={rightOnClick}/>
    </S.Questionnaire>
  );
}

export default Questionnaire;
