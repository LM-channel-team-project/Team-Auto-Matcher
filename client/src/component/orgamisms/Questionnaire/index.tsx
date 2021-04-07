import React from 'react';
import * as S from './style';

interface IQuestionnaire {
  question: string;
  questionList: string[];
  bDuplicateSelect: boolean;
  leftOnClick: React.MouseEventHandler<HTMLDivElement>;
  rightOnClick: React.MouseEventHandler<HTMLDivElement>;
  currentPage: number;
  totalPage: number;
  className?: string;
}

function Questionnaire({
  question,
  questionList,
  bDuplicateSelect,
  leftOnClick,
  rightOnClick,
  currentPage,
  totalPage,
  className,
}: IQuestionnaire) {
  return (
    <S.Questionnaire className={className}>
      <div className='header'>
        <S.QuestionBlock className={`${className}`}>{question}</S.QuestionBlock>
        <S.PageCnt currentPage={currentPage} totalPage={totalPage} />
      </div>
      <S.MultiCheckbox questionList={questionList} bDuplicateSelect={bDuplicateSelect} />
      <S.ArrowNav leftOnClick={leftOnClick} rightOnClick={rightOnClick}/>
    </S.Questionnaire>
  );
}

export default Questionnaire;
