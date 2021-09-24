import React from 'react';

import { Answers } from 'types';
import * as S from './style';

export interface QuestionRespondProps extends Answers {
  className?: string;
}

function QuestionRespond({ title, answers, className }: QuestionRespondProps) {
  const QuestionRespondComponents = answers.map((questionRespond: string) => (
    <span className="questionRespond">{questionRespond}</span>
  ));
  return (
    <S.QuestionRespond className={className}>
      <div className="title">Q : {title}</div>
      <div className="wrapper">{QuestionRespondComponents}</div>
    </S.QuestionRespond>
  );
}

export default QuestionRespond;
