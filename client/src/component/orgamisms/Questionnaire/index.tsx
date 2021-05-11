import React, { useState } from 'react';
import * as S from './style';

interface IQuestionnaire {
  question: string;
  questionList: string[];
  bDuplicateSelect: boolean;
  leftOnClick: any;
  rightOnClick: any;
  selectedData?: string[],
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
  selectedData = [],
  currentPage,
  totalPage,
  className,
}: IQuestionnaire) {
  const [nowSelectedData, setNowSelectedData] = useState<string[]>(selectedData);
  return (
    <S.Questionnaire className={className}>
      <S.PageCnt currentPage={currentPage} totalPage={totalPage} />
      <S.QuestionBlock className={`${className}`}>{question}</S.QuestionBlock>
      <S.MultiCheckbox
        questionList={questionList}
        selectedData={nowSelectedData}
        setSelectedData={setNowSelectedData}
        bDuplicateSelect={bDuplicateSelect}
      />
      {/* <S.ArrowNav
        leftOnClick={leftOnClick(nowSelectedData)}
        rightOnClick={rightOnClick(nowSelectedData)}
      /> */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <S.backButton onClick={leftOnClick(nowSelectedData)}>Back</S.backButton>
        <S.nextButton onClick={rightOnClick(nowSelectedData)}>Next</S.nextButton>
      </div>
    </S.Questionnaire>
  );
}

export default Questionnaire;
