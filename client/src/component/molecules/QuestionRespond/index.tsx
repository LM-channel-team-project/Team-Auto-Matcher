import React from 'react';
import * as S from './style';

export interface IAnswers {
  title: string;
  answers: string[];
}
export interface IQuestionRespond extends IAnswers {
  className?: string;
}

function QuestionRespond({ title, answers, className }: IQuestionRespond) {
  const QuestionRespondComponents = answers.map(
    (questionRespond: string) => <div className="questionRespond">{questionRespond}</div>,
  );
  return (
    <S.QuestionRespond className={className}>
      <div className="title">Q: {title}</div>
      <div className="wrapper">
        {QuestionRespondComponents}
      </div>
    </S.QuestionRespond>
  );
}

export default QuestionRespond;
