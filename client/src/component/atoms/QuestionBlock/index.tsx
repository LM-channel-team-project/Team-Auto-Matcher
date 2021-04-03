import React from 'react';
import * as S from './style';

interface IQuestionBlock {
  className?: string;
  children?: string
  | React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}

function QuestionBlock({ className, children }: IQuestionBlock) {
  return (
    <S.QuestionBlock className={className}>{children}</S.QuestionBlock>
  );
}

export default QuestionBlock;
