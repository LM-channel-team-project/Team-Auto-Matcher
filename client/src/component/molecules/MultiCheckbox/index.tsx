import React from 'react';
import * as S from './style';

interface IMultiCheckbox {
  questionList: string[];
  className?: string;
}

function MultiCheckbox({ questionList, className }: IMultiCheckbox) {
  const CheckboxList = questionList.map((question: string) => (
    <S.Wrapper>
      <S.QuestionBlock text={question} />
      <S.Checkbox />
    </S.Wrapper>
  ));

  return (
    <S.MultiCheckbox className={className}>
      {CheckboxList}
    </S.MultiCheckbox>
  );
}

export default MultiCheckbox;
