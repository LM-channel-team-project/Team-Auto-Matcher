import React from 'react';
import * as S from './style';

interface IQuestionBlock {
  text: string;
  className?: string;
}

function QuestionBlock({ text, className }: IQuestionBlock) {
  return (
    <S.QuestionBlock className={className}>{text}</S.QuestionBlock>
  );
}

export default QuestionBlock;
