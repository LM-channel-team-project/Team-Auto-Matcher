import React, { useState } from 'react';
import * as S from './style';

interface IQuestionnaire {
  onClickList: any;
  question: string;
  questionList: string[];
  bDuplicateSelect: boolean;
  leftOnClick: any;
  rightOnClick: any;
  selectedData?: string[];
  currentPage: number;
  totalPage: number;
  className?: string;
  listQuestionnairesData?: string[];
}

function Questionnaire({
  onClickList,
  question,
  questionList,
  bDuplicateSelect,
  leftOnClick,
  rightOnClick,
  selectedData = [],
  currentPage,
  totalPage,
  className,
  listQuestionnairesData,
}: IQuestionnaire) {
  const [nowSelectedData, setNowSelectedData] = useState<string[]>(
    selectedData,
  );
  return (
    <S.Questionnaire className={className}>
      <S.QuestionBlock className={`${className}`}>{question}</S.QuestionBlock>
      <S.ProgressBar
        currentPage={currentPage}
        totalPage={totalPage}
        onClickList={(e: any) => onClickList(e, nowSelectedData)}
        listQuestionnairesData={listQuestionnairesData}
      />
      <S.MultiCheckbox
        questionList={questionList}
        selectedData={nowSelectedData}
        setSelectedData={setNowSelectedData}
        bDuplicateSelect={bDuplicateSelect}
      />
      <S.DirectionNav
        leftOnClick={leftOnClick(nowSelectedData)}
        rightOnClick={rightOnClick(nowSelectedData)}
      />
    </S.Questionnaire>
  );
}

export default Questionnaire;
