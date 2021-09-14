import React from 'react';
import { QuestionRespondProps } from 'types/type';
import * as S from './style';

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
