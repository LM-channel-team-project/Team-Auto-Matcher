import React from 'react';
import * as S from './style';

export interface IQuestionRespond {
  title: string;
  questionRespondList: string[]
  className?: string;
}

function QuestionRespond({ title, questionRespondList, className }: IQuestionRespond) {
  const QuestionRespondComponents = questionRespondList.map(
    (questionRespond: string) => <div className="questionRespond">{questionRespond}</div>,
  );
  return (
    <S.QuestionRespond className={className}>
      <div className="title">{title}</div>
      <div className="wrapper">
        {QuestionRespondComponents}
      </div>
    </S.QuestionRespond>
  );
}

export default QuestionRespond;
